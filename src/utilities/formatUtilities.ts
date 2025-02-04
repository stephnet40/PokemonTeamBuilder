export const formatName = (name: string) => {
    name = name.split("-").map(x => x.replace(/^./g, char => char.toUpperCase())).join(" ");

    // Nidoran Formatting
    if (/\s[fm]$/i.test(name)) {
        const endInd = name.length - 1;
        if (name[endInd] == 'F') name = name.replace(/\sf$/i, "♀")
        else name = name.replace(/\sm$/i, "♂")
    }

    return name;
}

