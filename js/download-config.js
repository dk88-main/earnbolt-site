// Download configuration for GTA Vice City plugins
const DOWNLOAD_CONFIG = {
    baseUrl: 'https://your-domain.com/IBD3D.html?file=',
    
    // Animal Plugins
    animals: {
        bee: 'bee',
        godzilla: 'godzilla',
        deer: 'deer',
        crocodile: 'crocodile',
        eagle: 'eagle',
        gorilla: 'gorilla',
        lion: 'lion',
        peacock: 'peacock',
        snake: 'snake',
        zebra: 'zebra'
    },
    
    // Vehicle Plugins
    vehicles: {
        invisiblecar: 'invisiblecar',
        kgfbike: 'kgfbike',
        farmtractor: 'farmtractor',
        omnivan: 'omnivan',
        rangerover: 'rangerover',
        swift2024: 'swift2024',
        terzolombo: 'terzolombo'
    },
    
    // Mission Plugins
    missions: {
        mission1: 'mission1',
        mission2: 'mission2',
        mission3: 'mission3',
        mission4: 'mission4',
        mission5: 'mission5',
        mission6: 'mission6',
        mission7: 'mission7'
    },
    
    // City Plugins
    cities: {
        egyptcity: 'egyptcity',
        villagemap: 'villagemap',
        zoo: 'zoo',
        doraemonhouse: 'doraemonhouse'
    },
    
    // Player Plugins
    players: {
        beast: 'beast',
        carry: 'carry',
        giraf: 'giraf',
        monkey: 'monkey',
        skeleton: 'skeleton'
    },
    
    // RGS Load Files
    rgsfiles: {
        buggy: 'buggy',
        bujji: 'bujji',
        bullmen: 'bullmen',
        doremon: 'doremon',
        dragon: 'dragon',
        franklin: 'franklin',
        girl: 'girl',
        gtacity: 'gtacity',
        hoverbike: 'hoverbike',
        mcqueen: 'mcqueen',
        micheal: 'micheal',
        motupatlun: 'motupatlun',
        primo: 'primo',
        rollsroyce: 'rollsroyce',
        hunter: 'hunter',
        shinchan: 'shinchan',
        shopping: 'shopping',
        trevor: 'trevor',
        tung: 'tung'
    },
    
    // Challenge Plugins
    challenges: {
        cityv2: 'cityv2',
        horrorghost: 'horrorghost',
        horrorv2: 'horrorv2',
        racetrack: 'racetrack',
        zombie: 'zombie'
    },
    
    // RGS MOD Plugins
    rgsmods: {
        builddestroy: 'builddestroy',
        chirag: 'chirag',
        clothing: 'clothing',
        dsgamerz: 'dsgamerz',
        funntyaa: 'funntyaa',
        funntyaaf2: 'funntyaaf2',
        gamermgs: 'gamermgs',
        gamingboy: 'gamingboy',
        indianjoker: 'indianjoker',
        jayplays: 'jayplays',
        khan: 'khan',
        manyupdate: 'manyupdate',
        nitesh: 'nitesh',
        openeyes: 'openeyes',
        playgamer: 'playgamer',
        playermax: 'playermax',
        rgsmegaramp: 'rgsmegaramp',
        mafiaf2: 'mafiaf2',
        mafia: 'mafia',
        uggamer: 'uggamer'
    }
};

// Generate download link
function generateDownloadLink(category, item) {
    const fileKey = DOWNLOAD_CONFIG[category]?.[item];
    if (!fileKey) {
        console.error('File not found:', category, item);
        return '#';
    }
    return DOWNLOAD_CONFIG.baseUrl + fileKey;
}

// Copy download link to clipboard
function copyDownloadLink(category, item) {
    const link = generateDownloadLink(category, item);
    navigator.clipboard.writeText(link).then(() => {
        alert('Download link copied! Paste it in browser to download.');
    }).catch(() => {
        prompt('Copy this download link:', link);
    });
}

// Direct download function
function directDownload(category, item) {
    const link = generateDownloadLink(category, item);
    window.open(link, '_blank');
}