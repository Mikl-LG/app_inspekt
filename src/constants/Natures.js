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
                addOns: ["usureGenerale","largeurTravailMetres","typeAligneusePierres","attelageOutil","repliageChassis","nombrePoutres","sectionPoutre","usureSocs","typeReglageAngle","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","miseEnAndain","suiviSol","essieuPrincipal","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAndaineur","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","dechargementRemorque","usureChaines","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsAutochargeuse","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","largeurTravailMetres","entrainementOutil","attelageOutil","repliageChassis","commandesHydrauliques","typeReglageAngle","usureChassis","usureBalais","miseAuTransport","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","materiauxCaisse","remorqueBennage","remorquePorte","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","chargeUtile","materiauxCaisse","usureChassis","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBetaillere","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","largeurTravailMetres","typeBroyeur","attelageOutil","repliageChassis","nombreCouteauxAremplacer","miseAuTransport","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsBroyeur","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage","documents"]
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
                addOns:["usureGenerale","typeCharrue","nombreSocs","securiteTravailSol","hauteurDegagement","entrePointes","sectionPoutre","diametreFusee","largeurTravailPouces","varilarge","typeSocs","usureSocs","typePointes","usurePointes","typeRasettes","usureRasettes","typeVersoirs","usureVersoirs","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","documents"]
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
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau","boitier","cuve","socs","rampe"]
            }
        }
    },
    {
        name: "Cover crop",
        key: "cropTillage",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","typeCoverCrop","attelageOutil","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["usureDisques","securite"]
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
                addOns:["usureGenerale","largeurTravailMetres","typeCueilleur","nombreRangs","ecartementRangs","reglagePlaques","marqueTablierAttelageMoissonneuse","usureRouleauxEpanouilleurs","usureVis","usureCouteaux","usureChainesAlimentation","usureChaines","optionsCueilleur","conformite","etatCarosserie","documents"]
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
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","attelageOutil","tablierAttelage","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsDerouleuse","conformite","documents"]
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
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","vitessePDF","usureTapis","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs","tapis","couteaux","interieurCaisse_1","interieurCaisse_2","boitier","goulotte"]
            }
        }
    },
    {
        name: "Divers",
        key: "nondefined",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","nbrHectares","cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","repliageChassis","sectionPoutre","nombreSocsDisques","typeSocsDisques","usureSocsDisques","securiteTravailSol","typeReglageAngle","hauteurDegagement","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:[]
            }
        }
    },
    {
        name: "Enrubanneuse",
        key: "wrapper",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes"]
            },
            3:{
                addOns:["usureGenerale","attelageOutil","diametreMaxBotte","rotationEnrubanneuse","nombreRouleaux","nombreCourroies","commandesEnrubanneuse","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEnrubanneuse","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["hrsMoteur", "hrsRotor","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3:{
                addOns:["usureGenerale","puissance","etatMoteur","transmissionAutomoteur","transmissionAutomoteurModele","etatTransmission","largeurCanal","rouleauxAlimentation","nombreCouteaux","eclateur","reglageContreCouteau","cabineAutomoteur","etatClimatisation","usureTolesRotor","usureTolesGoulotte","usureCouteaux","usureContreCouteau","marqueRecolteur","modeleRecolteur","vitesseMaximaleAutomoteur","etatPonts","autoguidageEmbarque","commentaireConsole","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsEnsileuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["recolteur_1","recolteur_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise"]
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
                addOns:["usureGenerale","largeurTravailMetres","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","freinageOutil","usureAubes","usurePeinture","usureTremie","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurEngrais","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","capaciteEnM3","chargeUtile","largeurTravailMetres","herissons","remorquePorte","usureHerissons","usureChainesBarettes","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsEpandeurFumier","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["hrsRotor","compteur"]
            },
            3:{
                addOns:["usureGenerale","puissance","largeurTravailMetres","porteeHorizontale","monolevier","attelageOutilEpareuse","usureCouteaux","optionsEpareuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["refroidisseur","couteaux","attelage"]
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
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","nombreRotors","nombreBrasRotors","nombreDentsARemplacer","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaneuse","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","typeFaucheuse","largeurTravailMetres","attelageOutil","repliageChassis","nombreAssiettesTambours","fixationCouteaux","vitessePDF","conditionneur","usureDisques","usureLamier","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsFaucheuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns: ["lamier","conditionneur"]
            }
        }
    },
    {
        name: "Fraise rotative",
        key: "rotaryTiller",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureLames","nombreLamesARemplacer","typeRouleau","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["boitier","lames","rouleau"]
            }
        }
    },
    {
        name: "Guidage",
        key: "guidanceSystem",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","typeGuidage","precisionSignal","correctionSignal","activationSignal","versionConsole","diagonaleEcran","optionsGuidage","documents"]
            },
            4:{
                type:'regular',
                addOns:["antenne","console","volant","controleur","supportAntenne"]
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
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","commandesHydrauliques","optionsGodet","documents"]
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
                addOns: ["usureGenerale","largeurGodet","capaciteEnLitres","tablierAttelage","usureLame","usureSpire","commandesHydrauliques","documents"]
            },
            4:{
                type:'regular',
                addOns:["lame","spire"]
            }
        }
    },
    {
        name: "Herse étrille",
        key: "springTineHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreDentsARemplacer","commandesHydrauliques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dents"]
            }
        }
    },
    {
        name: "Herse rotative",
        key: "rotativeHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","commandesHydrauliques","optionsHerse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dents","rouleau"]
            }
        }
    },
    {
        name: "Herse à paille",
        key: "strawHarrow",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRotors","fixationDentsHerse","nombreDentsARemplacer","typeRouleau","commandesHydrauliques","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","typeReglageAngle","usureLame","commandesHydrauliques","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsGodet","documents"]
            },
            4:{
                type:'trailed',
                addOns:["lame"]
            }
        }
    },
    {
        name: "Machine à vendanger",
        key: "grapeHarvesting",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur", "hrsRecolte","hrsPrev","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3: {
                addOns:["puissance","etatMoteur","cabine","climatisation","etatClimatisation","siege","radio","capaciteBacEnLitres","nombreBrasCueilleurs","dimensionPneumatiquesAvant", "marquePneumatiquesAvant", "usurePneumatiquesAvant", "dimensionPneumatiquesArriere", "marquePneumatiquesArriere", "usurePneumatiquesArriere","optionTeteRecolte","multifonction","optionsMachineVendanger","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4: {
                type:'regular',
                addOns:["compteurHeuresRecolte","toit","spoilerDroit","spoilerGauche","capotLateral","avant","arriere","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","interieurTeteRecolte","ecaille","tapis","virages","baches","portes","defautChassis","defautDirection","defautMoteurRoue","defautPompeHydraulique","carteGrise"]
            }
        }
    },
    {
        name: "Machine à vendanger tractée",
        key: "grapeHarvestingTrailed",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsRecolte","hrsPrev"]
            },
            3: {
                addOns:["capaciteBacEnLitres","nombreBrasCueilleurs","dimensionPneumatiques", "marquePneumatiques", "usurePneumatiques","optionTeteRecolte","optionsMachineVendangertrainee","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4: {
                type:'trailed',
                addOns:["compteurHeuresRecolte","pupitreCommande","capotLateral","avant","arriere","interieurTeteRecolte","ecaille","tapis","virages","baches","portes","defautChassis","defautDirection","defautMoteurRoue","defautPompeHydraulique"]
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
                addOns:["usureGenerale","attelageOutil","capaciteEnM3","entrainementTurbine","usureTurbine","nombreDeVis","nombreDeCouteauxParVis","usureCouteaux","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","entrainementTapis","usureTapis","vitessePDF","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsMelangeuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["turbine","demeleurs","tapis","convoyeur","couteaux","interieurCaisse_1","interieurCaisse_2","boitier","goulotte"]
            }
        }
    },
    {
        name: "Melangeuse automotrice",
        key: "automotiveMixFeeder",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3:{
                addOns:["usureGenerale","puissance","etatMoteur","transmissionAutomoteur","etatTransmission","etatPonts","etatClimatisation","vitesseMaximaleAutomoteur","capaciteEnM3","usureTurbine","nombreDeVis","nombreDeCouteauxParVis","usureCouteaux","nombreDemeleurs","entrainementDemeleurs","usureDemeleurs","usureTapis","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsMelangeuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["turbine","demeleurs","tapis","convoyeur","couteaux","boitier","goulotte","interieurCaisse_1","interieurCaisse_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise"]
            }
        }
    },
    {
        name: "Moissonneuse",
        key: "combineHarvester",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur", "hrsBatteur",'hrsRotor','nbrHectares',"compteur","interieurCabine_1","interieurCabine_2"]
            },
            3:{
                addOns:["usureGenerale","typeSeparationMoissoneuse","puissance","etatMoteur","transmissionAutomoteur","etatTransmission","vitesseMaximaleAutomoteur","etatPonts","climatisation","etatClimatisation","siege","autoguidageEmbarque","commentaireConsole","compensationNiveau","optionsMoissonneuseConvoyeur","etatConvoyeur","optionsMoissonneuseBatteur","etatBatteur","optionsMoissonneuseCaisson","etatCaisson","nombreCouteauxBroyeur","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","largeurCoupe","optionsMoissonneuseCoupe","etatCoupe","scieColza","rallongeColza","chariot","marqueChariot","plateauxTournesol","optionsMoissonneuse","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["recolteur_1","recolteur_2","scie_1","scie_2","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise"]
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
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["rouleau"]
            }
        }
    },
    {
        name: "Pick-up",
        key: "pickUp",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","marqueTablierAttelageMoissonneuse","repliageChassis","nombreDentsARemplacer","usureChaines","usureRouleaux","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["pickUp","entrainementGauche","entrainementDroit","rouleau"]
            }
        }
    },
    {
        name: "Pince balles",
        key: "baleGrapple",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns:[]
            },
            3:{
                addOns: ["usureGenerale","typePinceBalles","tablierAttelage","nombreDentsParBras","ecartementDents","hauteursurelevation","commandesHydrauliques","optionsPinceBalles","documents"]
            },
            4:{
                type:'regular'
            }
        }
    },
    {
        name: "Plateau fourrager",
        key: "forageTrailer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","chargeUtile","materiauxCaisse","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed'
            }
        }
    },
    {
        name: "Presse balles rondes",
        key: "baler",       
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes","compteur"]
            },
            3:{
                addOns:["usureGenerale","diametreMaxBotte","typeChambrePresse","typeAmeneur","liageBotte","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","usureChaines","usureCourroies","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesRondes","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","pickUp","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Presse haute densite",
        key: "largeSquarebaler",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["cptrBottes","compteur"]
            },
            3:{
                addOns:["usureGenerale","canalPresse","largeurPickUp","nombreDentsARemplacer","nombreCouteaux","liagePresseCarre","nettoyageNoueurs","usureChaines","typeEssieuRemorque","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPresseBallesCarrees","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","pickUp","canal","entrainementGauche","entrainementDroit"]
            }
        }
    },
    {
        name: "Pré-tailleuse",
        key: "prePruners",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsRecolte"]
            },
            3: {
                addOns:["attelageOutilViti","monolevier","nombrePairesDisques","typeTaille","optionsPreTailleuse","conformite","documents"]
            },
            4: {
                type:'trailed',
                addOns:["couteaux","defautChassis","defautPompeHydraulique"]
            }
        }
    },
    {
        name: "Pulverisateur",
        key: "sprayer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["nbrHectares"]
            },
            3:{
                addOns:["usureGenerale","largeurTravailMetres","materiauxRampe","capaciteEnLitres","attelageOutil","entrainementOutil","commandesHydrauliques","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","porteBuse","correcteurDeversPulverisateur","geometrieVariable","suspensionEssieu","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsPulverisateur","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:["boitier","rampeDroite","rampeGauche","cadreCentral","cuve","controleTechnique"]
            }
        }
    },
    {
        name: "Pulverisateur automoteur",
        key: "sprayerAutomotive",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","nbrHectares","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3:{
                addOns:["usureGenerale","puissance","etatMoteur","transmissionTracteur","transmissionTracteurModele","nombreVitesses","etatTransmission","vitesseMaximaleTracteur","inverseur","freinage","etatPonts","cabine","climatisation","etatClimatisation","siege","radio","autoguidageEmbarque","commentaireConsole","largeurTravailMetres","materiauxRampe","capaciteEnLitres","typePompe","debitPompe","regulation","repliageRampe","nombreTroncons","porteBuse","correcteurDeversPulverisateur","geometrieVariable","suspensionEssieu","freinage","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsPulverisateurAutomoteur","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise","attelage","boitier","rampeDroite","rampeGauche","cadreCentral","cuve"]
            }
        }
    },
    {
        name: "Rogneuse",
        key: "trimmer",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsRecolte"]
            },
            3: {
                addOns:["nombreDemiRangs","attelageOutilViti","monolevier","nombreCouteauxVerticaux","nombreCouteauxHorizontaux","typeCoupe","dimensionPneumatiques", "marquePneumatiques", "usurePneumatiques","optionsRogneuse","conformite","documents"]
            },
            4: {
                type:'trailed',
                addOns:["couteaux","defautChassis","defautPompeHydraulique"]
            }
        }
    },
    {
        name: "Quad",
        key: "quad",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","compteurKm"]
            },
            3:{
                addOns:["usureGenerale","puissance","motorisationQuad","cylindree","capaciteReservoir","hauteur","largeur","longueur","transmissionQuad","nombreVitesses","vitesseMaximaleQuad","cabine","climatisation","siege","radio","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsQuad","conformite","documents"]
            },
            4:{
                type:'regular',
                addOns:["compteur","dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise","attelage"]
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
                addOns:["usureGenerale","typeSemoir","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","nombreRangs","typeRouleau","capaciteEnLitres","typeDistribution","typeRotorDoseur","typeDisqueDoseur","diametreDisquesSemeurs","typeEnterrage","usureSocs","commandesHydrauliques","optionsSemoir","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns:["usureGenerale","largeurTravailMetres","attelageOutil","repliageChassis","usureRouleaux","typeRouleau","conformite","documents"]
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
                addOns: ["hrsMoteur","hrsPrev","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3: {
                addOns:["usureGenerale","puissance","etatMoteur","capaciteEnTonnes","longueurFleche","teteAttelage","transmissionTracteur","nombreVitesses","etatTransmission","vitesseMaximaleTracteur","rouesDirectrices","inverseur","freinage","etatPonts","cabine","climatisation","etatClimatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","optionsTelescopique","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","outil_1","outil_2","outil_3","outil_4","outil_5","carteGrise"]
            }
        }
    },
    {
        name: "Tonne a eau",
        key: "waterTank",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: []
            },
            3:{
                addOns:["usureGenerale","capaciteEnLitres","chargeUtile","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","conformite","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'trailed',
                addOns:[]
            },
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
                addOns:["usureGenerale","capaciteEnLitres","chargeUtile","largeurTravailMetres","attelageRemorque","suspensionFleche","typeEssieuRemorque","sectionEssieu","commandesHydrauliques","freinageOutil","marquePneumatiques","dimensionPneumatiques","usurePneumatiques","optionsTonneLisier","conformite","etatCarosserie","etatEclairage","documents"]
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
                addOns: ["version","hrsMoteur","hrsPrev","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3: {
                addOns:["usureGenerale","puissance","etatMoteur","transmissionTracteur","transmissionTracteurModele","nombreVitesses","etatTransmission","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","etatClimatisation","siege","radio","priseDeForceAR","distributeursArriere","distributeursArriereElectriques","chandelles","stabilisateurs","pontAvant","etatPonts","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","commentaireConsole","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise","attelage"]
            }
        }
    },
    {
        name: "Tracteur chargeur",
        key: "tractorLoader",
        formStepsTypes : {
            2: {
                type: 'regular',
                addOns: ["version","hrsMoteur","hrsPrev","compteur","interieurCabine_1","interieurCabine_2"]
            },
            3: {
                addOns:["usureGenerale","puissance","etatMoteur","transmissionTracteur","transmissionTracteurModele","nombreVitesses","etatTransmission","vitesseMaximaleTracteur","inverseur","freinage","cabine","climatisation","etatClimatisation","siege","radio","priseDeForceAR","distributeursArriere","chandelles","stabilisateurs","pontAvant","etatPonts","relevageAvant","distributeursAvant","priseDeForceAV","autoguidageEmbarque","commentaireConsole","marquePneumatiquesAvant","dimensionPneumatiquesAvant","usurePneumatiquesAvant","marquePneumatiquesArriere","dimensionPneumatiquesArriere","usurePneumatiquesArriere","attelageTracteur","marqueChargeur","modeleChargeur","serieChargeur","usureGenerale","fonctionsChargeur","parallelogrammeChargeur","monolevier","tablierAttelage","etatCarosserie","etatEclairage","documents"]
            },
            4:{
                type:'regular',
                addOns:["dimensionPneumatiqueAvant","dimensionPneumatiqueArriere","carteGrise","attelage","monolevier","multicoupleur","outil_1","outil_2","outil_3","outil_4","outil_5"]
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