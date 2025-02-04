export const formatName = (name: string) => {

    // Check for Treasures of Ruin
    if (name == "wo-chien" || name == "chien-pao" || name == "ting-lu" || name == "chi-yu") {
        name = name.split("-").map(x => x.replace(/^./g, char => char.toUpperCase())).join("-");
    } else {
        name = name.split("-").map(x => x.replace(/^./g, char => char.toUpperCase())).join(" ");
    }

    // Nidoran Formatting
    if (/\s[fm]$/i.test(name)) {
        const endInd = name.length - 1;
        if (name[endInd] == 'F') name = name.replace(/\sf$/i, "♀")
        else name = name.replace(/\sm$/i, "♂")
    }

    // Check if Regional Form
    const regions = ["Alola", "Galar", "Hisui", "Paldea"];
    if (regions.some(region => name.includes(region))) {
        name = formatRegional(name);
    }

    // Megas & Gmax
    const battleGimmicks = ["Mega", "Gmax"];
    if (battleGimmicks.some(gimmick => name.includes(gimmick))) {
        name = formatGimmick(name);
    }

    return name;
}

const formatRegional = (name: string) => {
    let nameArr = name.split(" ");

    if (nameArr.includes("Alola")) {
        name = nameArr.filter(x => x != "Alola").join(" ");
        return `Alolan ${name}`;
    }
    if (nameArr.includes("Galar")) {
        name = nameArr.filter(x => x != "Galar").join(" ");
        return `Galarian ${name}`;
    }
    if (nameArr.includes("Hisui")) {
        name = nameArr.filter(x => x != "Hisui").join(" ");
        return `Hisuian ${name}`;
    }

    name = nameArr.filter(x => x != "Paldea").join(" ");
    return `Paldean ${name}`;
}

const formatGimmick = (name: string) => {
    let nameArr = name.split(" ");

    if (nameArr.includes("Mega")) {
        name = nameArr.filter(x => x != "Mega").join(" ");
        return `Mega ${name}`;
    }

    name = nameArr.filter(x => x != "Gmax").join(" ");
    return `Gigantamax ${name}`;
}

