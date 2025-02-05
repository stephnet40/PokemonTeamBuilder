// Format Game Titles
export const formatGames = (games: string) => {
    games = games.replace(/,$/, "");

    // Check Let's Go games
    if (games.includes("lets")) games = games.replace(/lets/g, "let's");

    // Check combination titles
    const substrs = ["rer", "fg", "tg", "ls"];
    if (substrs.some(x => games.includes(x))) {
        games = games.replace("rer", "reR").replace("fg", "fG").replace("tg","tG").replace("ls", "lS");
    }

    let gamesArr = games.split(",");
    
    games = gamesArr.map(x => x.split("-")
                    .map(y => y.replace(/^./, char => char.toUpperCase()))
                    .join(" "))
                    .join(", ");
    return games;
}

export const formatDexEntry = (text: string) => {
    text = text.replace(/[\u000c]/g, " ");
    return text;
}

// Format Pokemon Names
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
        name = `Mega ${name}`;
    }

    if (nameArr.includes("Gmax")) {
        name = nameArr.filter(x => x != "Gmax").join(" ");
        name = `Gigantamax ${name}`;
    }
    
    return name
}

