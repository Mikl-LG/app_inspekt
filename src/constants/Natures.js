import formsCatalog from './FormsCatalog'
import Steps from './Steps';

const Natures = [
    {
        name: "Aligneuse de pierres",
        key: "aligneuse",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"] // ex. ['tires'] (used by NewEvaluation.js)
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","typeAligneusePierres","attelageOutil","repliageChassis","nombrePoutres","sectionPoutre","usureSocs","typeReglageAngle","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:[]
            }
        }
    },
    {
        name: "Andaineur",
        key: "rake",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","miseEnAndain","suiviSol","essieuPrincipal","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAndaineur","conformite"]
            },
            4:{
                type:'trailed',
                addOns: ["bras", "toile"]
            }
        }
    },
    {
        name: "Autochargeuse",
        key: "silageTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","dechargementRemorque","usureChaines","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAutochargeuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Balayeuse",
        key: "sweeper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","entrainementOutil","attelageOutil","repliageChassis","commandesHydrauliques","typeReglageAngle","usureChassis","usureBalais","miseAuTransport","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["brosses"]
            }
        }
    },
    {
        name: "Benne",
        key: "trailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","materiauxCaisse","remorqueBennage","remorquePorte","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Betaillere",
        key: "livestockTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns: ["usureGenerale","chargeUtile","materiauxCaisse","usureChassis","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBetaillere","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Broyeur",
        key: "crusher",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","typeBroyeur","attelageOutil","repliageChassis","nombreCouteauxAremplacer","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBroyeur","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["couteaux","interieurCaisse_1","interieurCaisse_2"]
            }
        }
    },
    {
        name: "Chargeur Frontal",
        key: "frontLoader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage"]
            },
            4:{
                type:'regular',
                addOns:["monolevier","multicoupleur","outil_1","outil_2","outil_3","outil_4","outil_5"]
            }
        }
    },
    {
        name: "Charrue",
        key: "plough",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","typeCharrue","nombreSocs","securiteTravailSol","hauteurDegagement","entrePointes","sectionPoutre","diametreFusee","largeurTravailPouces","varilarge","typeSocs","usureSocs","typePointes","usurePointes","typeRasettes","usureRasettes","typeVersoirs","usureVersoirs","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["socs","rasette"]
            }
        }
    },
    {
        name: "Combine de Semis",
        key: "drillCombination",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","conformite"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Cueilleur",
        key: "harvestingPlatform",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","typeCueilleur","nombreRangs","ecartementRangs","reglagePlaques","marqueTablierAttelageMoissonneuse","usureRouleauxEpanouilleurs","usureVis","usureCouteaux","usureChainesAlimentation","usureChaines","optionsCueilleur","conformite"]
            },
            4:{
                addOns:["broyeur","rouleauxEpanouilleurs","visAlimentation"]
            },
        }
    },
    {
        name: "Dechaumeur",
        key: "tillage",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["socs","securite"]
            }
        }
    },
    {
        name: "Derouleuse",
        key: "forageUnroller",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","tablierAttelage","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDerouleuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["brasChargement","tapis"]
            },
        }
    },
    {
        name: "Desileuse pailleuse",
        key: "cattleFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs"]
            }
        }
    },
    {
        name: "Enrubanneuse",
        key: "wrapper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrBottes"]
            },
            3:{
                addOns:["usureGenerale","attelageOutil","diametreMaxBotte","rotationEnrubanneuse","nombreRouleaux","nombreCourroies","commandesEnrubanneuse","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEnrubanneuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["boitier"]
            }
        }
    },
    {
        name: "Ensileuse",
        key: "forageHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsRotor"]
            },
            3:{
                addOns:["usureGenerale","puissance","transmissionAutomoteur","largeurCanal","rouleauxAlimentation","eclateur","reglageContreCouteau","cabineAutomoteur","usureTolesRotor","usureTolesGoulotte","usureCouteaux","usureContreCouteau","marqueRecolteur","modeleRecolteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        name: "Epandeur engrais",
        key: "fertilizerSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","freinageOutil","usureAubes","usurePeinture","usureTremie","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurEngrais","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","aubes"]
            }
        }
    },
    {
        name: "Epandeur fumier",
        key: "manureSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurTravailMetres","herissons","remorquePorte","usureHerissons","usureChainesBarettes","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurFumier","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["interieurCaisse_1","interieurCaisse_2","tapis","herissons"]
            },
        }
    },
    {
        name: "Epareuse",
        key: "reachMower",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","puissance","porteeHorizontale","monolevier","attelageOutil","usureCouteaux","optionsEpareuse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["couteaux"]
            }
        }
    },
    {
        name: "Faneuse",
        key: "tedder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3: {
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","armRotorNumber","nombreDentsARemplacer","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaneuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns: []
            }
        }
    },
    {
        name: "Faucheuse",
        key: "mower",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3: {
                addOns: ["usureGenerale","faucheuseType","largeurTravailMetres","attelageOutil","repliageChassis","nombreAssiettesTambours","fixationCouteaux","vitessePDF","conditionneur","usureDisques","usureLamier","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaucheuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns: ["lamier","conditionneur"]
            }
        }
    },
    {
        name: "Godet",
        key: "dipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","commandesHydrauliques","optionsGodet"]
            },
            4:{
                type:'regular',
                addOns:["lame"]
            }
        }
    },
    {
        name: "Godet Desileur",
        key: "feedingDipper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","usureSpire","commandesHydrauliques"]
            },
            4:{
                type:'regular',
                addOns:["lame","spire"]
            }
        }
    },
    {
        name: "Herse Rotative",
        key: "rotativeHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","commandesHydrauliques","optionsHerse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau"]
            }
        }
    },
    {
        name: "Lame",
        key: "blade",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","typeReglageAngle","usureLame","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsGodet"]
            },
            4:{
                type:'trailed',
                addOns:["lame"]
            }
        }
    },
    {
        name: "Melangeuse",
        key: "mixFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDesileuse","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs","tapis"]
            }
        }
    },
    {
        name: "Moissonneuse",
        key: "combineHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsBatteur"]
            },
            3:{
                addOns:["usureGenerale","typeSeparationMoissoneuse","puissance","transmissionAutomoteur","cabineAutomoteur","vitesseMaximaleAutomoteur","autoguidageEmbarque","compensationNiveau","plastron","nombreCouteauxBroyeur","chariot","marqueChariot","rallongeColza","plateauxTournesol","largeurCoupe","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsMoissonneuse","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise"]
            }
        }
    },
    {
        name: "Outil de plombage",
        key: "heavyRolls",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["rouleau"]
            }
        }
    },
    {
        name: "Porteur Multifonction",
        key: "porteur_multifonction",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsMoteur", "hrsSecouage"]
            },
            /** RAT : Ajouté par Mathieu : plz confirm */
            3: {
                addOns:["porteurType", "puissance", "transmission", "cabine", "porteurSeat", "dimensionPneumatiquesAvant", "marquePneumatiquesAvant", "usurePneumatiquesAvant", "dimensionPneumatiquesArriere", "marquePneumatiquesArriere", "usurePneumatiquesArriere", "multifonction", "porteurOptions", "porteurConformity"]
            },
            4: {
                type:'regular'  // RAT : plz confirm : step 4 est inexistante sur la v1 ?
            }

            /** end ajouté par Mathieu */
        }
    },
    {
        name: "Presse balles rondes",
        key: "baler",       
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","diametreBotte","typeChambrePresse","typeAmeneur","liageBotte","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","usureChaines","usureCourroies","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Presse haute densite",
        key: "largeSquarebaler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","canalPresse","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","liagePresseCarre","nettoyageNoueurs","usureChaines","typeEssieuRemorque","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","optionsPresseBallesCarrees","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","canal","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Pulverisateur",
        key: "pulverisateur",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","materiauxRampe","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","portesBuses","correcteurDeversPulverisateur","geometrieVariable","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPulverisateur","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","rampeDroite","rampeGauche","cadreCentral","cuve"]
            }
        }
    },
    {
        name: "Semoir en ligne",
        key: "inlineDrill",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","typeSemoir","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Semoir monograine",
        key: "precisionSeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","typeSemoir","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeRotorDoseur","typeDisqueDoseur","diametreDisquesSemeurs","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Tasse Avant",
        key: "frontRoll",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","conformite"]
            },
            4:{
                type:'regular',
                addOns:["rouleau"]
            }
        }
    },
    {
        name: "Telescopique",
        key: "telehandler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsCptr"]
            },
            3: {
                addOns:["usureGenerale","puissance","capaciteEnTonnes","longueurFleche","teteAttelage","transmissionTracteur","nombreVitesses","vitesseMaximaleTracteur","rouesDirectrices","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsTelescopique","conformite"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2",,"outil_1","outil_2","outil_3","outil_4","outil_5","carteGrise"]
            }
        }
    },
    {
        name: "Tonne a lisier",
        key: "manureTankSpreader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnLitres","chargeUtile","largeurTravailMetres","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsTonneLisier","conformite"]
            },
            4:{
                type:'trailed',
                addOns:["buses","pompage"]
            },
        }
    },
    {
        name: "Tracteur",
        key: "tractor",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["hrsCptr"]
            },
            3: {
                addOns:["usureGenerale","puissance","transmissionTracteur","nombreVitesses","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","pontAvant","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurCabine_1","interieurCabine_2","carteGrise","attelage"]
            }
        }
    }
  
]

const getNature = async(key) => {
    
    const nature = await Promise.resolve(
        Natures.filter((n) => n.key === key)
    )

    return nature.length ? nature[0] : undefined
}

const getAllPossibleFields = async(/*returnArray*/) => {
    
    let steps = await formsCatalog.formSteps({list: true})

    // { 1: {key, title, fields[]}, 2: {*idem*}, ... }
    const allPossibleFields = await new Promise((_steps) => {
        let joinedSteps = {};

        Object.keys(Steps).forEach(async(i) => {
            const {key, title} = Steps[i];

            const defaultFields = await Promise.resolve(Steps[i].fields || [])

            const regularFields = await Promise.resolve(
                (steps[i] && steps[i].regular) ? Object.keys(steps[i].regular).map((reg) => steps[i].regular[reg]) : []
            )
            const addOnsFields = await Promise.resolve(
                (steps[i] && steps[i].addOns) 
                ? Object.keys(steps[i].addOns).map((ao) => {
                    let addOn = steps[i].addOns[ao];
                    return {property: addOn.property, title: addOn.title}
                }) 
                : []
            )

            const joinedFields = await Promise.resolve([
                ...regularFields,
                ...addOnsFields,
                ...defaultFields
            ])

            // remove all field.title double occurences 
            //let noDuplicatedFields = await removeDuplicates(joinedFields, "title")

            joinedSteps[i] = await Promise.resolve({
                
                    key,
                    title,
                    //fields: noDuplicatedFields
                
            });
            
            if (i === "5") _steps(joinedSteps);

        })
    })
    
    return allPossibleFields
  
    
}

/**
 * @dev Form fields datas specific to step and nature
 * @return Promise resolving to an object containing specific keys
 */
const stepSpecificDatas = ({step, nature}) => new Promise(async(resolve) => {

    if (step === 2) {
    
        const brands = await Promise.resolve(               // step 2 specific to nature machines brands
            formsCatalog[nature.key] ? formsCatalog[nature.key].brands : undefined
        )

        // sort years from current year decreasing to 30 years before
        const _years = await new Promise(async(_years) => {  // 30 years before current year
            let y = new Date(Date.now()).getFullYear()
            let years = []

            for (let i=0; i<=30; i++) {
                years.push((y - (30-i))) 
                
                if (years[i] === y)
                    _years(years)
            }
        })

        //@notice : Picker must receive a string, 'sortNumsBy' stringifies each iteration
        //const years = await Utils.sortNumsBy({
            //data: _years,
            //decreasing: true
        //})

        
        resolve({brands, _years})
    }
    // no specific data for step
    else resolve({})

})

export default {Natures, getNature, getAllPossibleFields, stepSpecificDatas}