// 1. Strict Category Type Definition
export type Category = 
  | "Electrical" 
  | "Plumbing" 
  | "Cleaning" 
  | "Appliance" 
  | "Carpenter" 
  | "Inspection" 
  | "Checkup" 
  | "SaloonWomen" 
  | "SaloonMen" 
  | "PestControl" 
  | "Painting" 
  | "Installation"
  | "General";

// 2. Comprehensive Sub-Category Specific Images Map
export const serviceImages: Record<string, string[]> = {
  // === Electrical Sub-Categories (20 Items) ===
  "switch-repair": ["https://images.unsplash.com/photo-1621905251918-48416bd8575a"],
  "fan-repair": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"],
  "light-repair": ["https://images.unsplash.com/photo-1565814636199-ae8133055c1c"],
  "geyser-repair": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
  "inverter-repair": ["https://images.unsplash.com/photo-1620288627223-53302f4e8c74"],
  "short-circuit": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"],
  "mcb-repair": ["https://images.unsplash.com/photo-1618477388954-7852f32655ec"],
  "cooler-repair": ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e"],
  "tv-repair": ["https://images.unsplash.com/photo-1601524909162-be87252be298"],
  "doorbell-repair": ["https://images.unsplash.com/photo-1555664424-778a1e5e1b48"],
  "exhaust-fan-service": ["https://images.unsplash.com/photo-1558317374-067fb5f30001"],
  "stabilizer-repair": ["https://images.unsplash.com/photo-1601524916057-a364be2c815c"],
  "chandelier-repair": ["https://images.unsplash.com/photo-1543248939-ff40856f65d4"],
  "db-box-repair": ["https://images.unsplash.com/photo-1595557424287-2e11e033d4e8"],
  "extension-board-repair": ["https://images.unsplash.com/photo-1614036417651-efe5912149d8"],
  "heater-repair": ["https://images.unsplash.com/photo-1626242258525-4c02f1ba8e53"],
  "ac-electrical-point": ["https://images.unsplash.com/photo-1527689368864-3a821dbccc34"],
  "pump-motor-panel": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"],
  "main-line-repair": ["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"],
  "appliance-check": ["https://images.unsplash.com/photo-1581092160607-ee22621dd758"],

  // === Plumbing Sub-Categories (20 Items) ===
  "tap-leak-repair": ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7"],
  "flush-tank-repair": ["https://images.unsplash.com/photo-1609840114035-3c981b782dfe"],
  "washbasin-unclog": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"],
  "pipe-leak-repair": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"],
  "shower-repair": ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14"],
  "drain-unclog": ["https://images.unsplash.com/photo-1542013936693-8848e57423e3"],
  "sink-pipe-repair": ["https://images.unsplash.com/photo-1521207418485-99c705420785"],
  "water-meter-repair": ["https://images.unsplash.com/photo-1584267385514-027599049984"],
  "gate-valve-repair": ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7"],
  "float-valve-repair": ["https://images.unsplash.com/photo-1563453392212-326f5e854473"],
  "commode-repair": ["https://images.unsplash.com/photo-1521207418485-99c705420785"],
  "cpvc-patch": ["https://images.unsplash.com/photo-1542013936693-8848e57423e3"],
  "jet-spray-repair": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
  "diverter-repair": ["https://images.unsplash.com/photo-1609840114035-3c981b782dfe"],
  "spindle-washer-change": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"],
  "ro-pipe-repair": ["https://images.unsplash.com/photo-1617113931021-995f514b8a2e"],
  "motor-suction-repair": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"],
  "geyser-pipe-fix": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
  "drain-cover-reset": ["https://images.unsplash.com/photo-1542013936693-8848e57423e3"],
  "plumbing-checkup": ["https://images.unsplash.com/photo-1581092160607-ee22621dd758"],

  // === Carpenter Sub-Categories (20 Items) ===
  "door-lock-repair": ["https://images.unsplash.com/photo-1558002038-1055907df827"],
  "cabinet-hinge-fix": ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88"],
  "drawer-channel-repair": ["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c"],
  "door-shaving-fix": ["https://images.unsplash.com/photo-1504148455328-c376907d081c"],
  "wardrobe-door-repair": ["https://images.unsplash.com/photo-1558882224-dda166733079"],
  "sofa-repair": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc"],
  "bed-support-repair": ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
  "curtain-rod-fix": ["https://images.unsplash.com/photo-1513694203232-719a280e022f"],
  "sliding-door-repair": ["https://images.unsplash.com/photo-1600585154526-990dced4db0d"],
  "door-latch-fix": ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"],
  "window-glass-patch": ["https://images.unsplash.com/photo-1509644851169-2acc08aa25b5"],
  "mosquito-mesh-repair": ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7"],
  "chair-wheel-replace": ["https://images.unsplash.com/photo-1580481072645-022f9a6dbf27"],
  "sunmica-repair": ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88"],
  "wood-beading-repair": ["https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5"],
  "mirror-bracket-fix": ["https://images.unsplash.com/photo-1618220179428-22790b461013"],
  "pigeon-net-repair": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"],
  "tv-drawer-repair": ["https://images.unsplash.com/photo-1593305841991-05c297ba4575"],
  "wood-touchup": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38"],
  "carpenter-inspection": ["https://images.unsplash.com/photo-1581092160607-ee22621dd758"],

  // === Home Appliance Sub-Categories (20 Items) ===
  "ro-filter-clean": ["https://images.unsplash.com/photo-1617113931021-995f514b8a2e"],
  "wm-drum-repair": ["https://images.unsplash.com/photo-1610461888750-10bfc601b874"],
  "fridge-cooling-fix": ["https://images.unsplash.com/photo-1571175432244-5f02585f809d"],
  "microwave-repair": ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"],
  "geyser-thermostat-repair": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
  "chimney-service": ["https://images.unsplash.com/photo-1565538810844-1e119de1f1dc"],
  "mixer-coupler-fix": ["https://images.unsplash.com/photo-1527661591475-527312dd65f5"],
  "gas-burner-clean": ["https://images.unsplash.com/photo-1522906454157-9fa497ef0545"],
  "induction-repair": ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"],
  "air-purifier-clean": ["https://images.unsplash.com/photo-1585771724684-38269d6639fd"],
  "ac-filter-service": ["https://images.unsplash.com/photo-1527689368864-3a821dbccc34"],
  "iron-repair": ["https://images.unsplash.com/photo-1517524008436-bbdb5199587d"],
  "juicer-motor-repair": ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"],
  "dishwasher-pump-repair": ["https://images.unsplash.com/photo-1585624484084-219ec2176c49"],
  "otg-gasket-fix": ["https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7"],
  "vacuum-motor-repair": ["https://images.unsplash.com/photo-1558317374-067fb5f30001"],
  "dispenser-cooling-fix": ["https://images.unsplash.com/photo-1609840114035-3c981b782dfe"],
  "fan-coil-rewind": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"],
  "freezer-gas-charge": ["https://images.unsplash.com/photo-1534353436294-0dbd4bdac845"],
  "general-diagnosis": ["https://images.unsplash.com/photo-1581092160607-ee22621dd758"],

  // === Women Salon Sub-Categories (19 Items) ===
  "women_1": ["https://images.unsplash.com/photo-1562322140-8baeececf3df"], // Haircut
  "women_2": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Wash & Dry
  "women_3": ["https://images.unsplash.com/photo-1519699047748-de8e457a634e"], // Hair Spa
  "women_4": ["https://images.unsplash.com/photo-1562322140-8baeececf3df"], // Hair Color
  "women_5": ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"], // Keratin
  "women_6": ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"], // Smoothening
  "women_7": ["https://images.unsplash.com/photo-1595853035070-59a39fe84de3"], // Rebonding
  "women_8": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Facial
  "women_9": ["https://images.unsplash.com/photo-1512290923902-8a9f81dc236c"], // Cleanup
  "women_10": ["https://images.unsplash.com/photo-1616394584738-fc6e612e71b9"], // Bleach
  "women_11": ["https://images.unsplash.com/photo-1515377905703-c4788e51af15"], // Waxing
  "women_12": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Threading
  "women_13": ["https://images.unsplash.com/photo-1604654894610-df490651e1af"], // Manicure
  "women_14": ["https://images.unsplash.com/photo-1519415421896-a197022b5858"], // Pedicure
  "women_15": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Bridal Makeup
  "women_16": ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"], // Party Makeup
  "women_17": ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"], // Saree Draping
  "women_18": ["https://images.unsplash.com/photo-1604654894610-df490651e1af"], // Nail Extension
  "women_19": ["https://images.unsplash.com/photo-1610030469983-98e550d6193c"], // Mehendi

  // === Men Salon Sub-Categories (16 Items) ===
  "men_1": ["https://images.unsplash.com/photo-1622286342621-4bd786c2447c"], // Haircut
  "men_2": ["https://images.unsplash.com/photo-1503951914875-452162b0f3f1"], // Beard Grooming
  "men_3": ["https://images.unsplash.com/photo-1622286342621-4bd786c2447c"], // Hair Color
  "men_4": ["https://images.unsplash.com/photo-1519823551278-64ac92734fb1"], // Head Massage
  "men_5": ["https://images.unsplash.com/photo-1616394584738-fc6e612e71b9"], // Face Clean-up
  "men_6": ["https://images.unsplash.com/photo-1519699047748-de8e457a634e"], // Hair Spa
  "men_7": ["https://images.unsplash.com/photo-1503951914875-452162b0f3f1"], // Shaving
  "men_8": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Facial
  "men_9": ["https://images.unsplash.com/photo-1616394584738-fc6e612e71b9"], // De-Tan Pack
  "men_10": ["https://images.unsplash.com/photo-1519415421896-a197022b5858"], // Pedicure
  "men_11": ["https://images.unsplash.com/photo-1604654894610-df490651e1af"], // Manicure
  "men_12": ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"], // Hair Straightening
  "men_13": ["https://images.unsplash.com/photo-1503919005314-30d93d07d823"], // Kid's Haircut
  "men_14": ["https://images.unsplash.com/photo-1512290923902-8a9f81dc236c"], // Charcoal Mask
  "men_15": ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"], // Skin Whitening
  "men_16": ["https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"], // Groom Package

  // === Cleaning Sub-Categories (16 Items) ===
  "clean_1": ["https://images.unsplash.com/photo-1581578731548-c64695cc6952"], // Full House
  "clean_2": ["https://images.unsplash.com/photo-1584622781564-1d987f7333c1"], // Bathroom
  "clean_3": ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"], // Kitchen
  "clean_4": ["https://images.unsplash.com/photo-1484101403633-562f891dc89a"], // Sofa
  "clean_5": ["https://images.unsplash.com/photo-1558317374-067fb5f30001"], // Carpet
  "clean_6": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"], // Water Tank
  "clean_7": ["https://images.unsplash.com/photo-1507136566006-cfc505b114fc"], // Car
  "clean_8": ["https://images.unsplash.com/photo-1497366216548-37526070297c"], // Office
  "clean_9": ["https://images.unsplash.com/photo-1538688525198-9b88f6f53126"], // Balcony
  "clean_10": ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"], // Mattress
  "clean_11": ["https://images.unsplash.com/photo-1513694203232-719a280e022f"], // Glass Window
  "clean_12": ["https://images.unsplash.com/photo-1565538810844-1e119de1f1dc"], // Chimney
  "clean_13": ["https://images.unsplash.com/photo-1562259949-e8e7689d7828"], // Floor Polishing
  "clean_14": ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f"], // Post Paint
  "clean_15": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"], // Drain Jet
  "clean_16": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38"], // Blinds

  // === Painting Sub-Categories (16 Items) ===
  "paint_1": ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f"], // Interior
  "paint_2": ["https://images.unsplash.com/photo-1513694203232-719a280e022f"], // Exterior
  "paint_3": ["https://images.unsplash.com/photo-1562259949-e8e7689d7828"], // Wall Putty
  "paint_4": ["https://images.unsplash.com/photo-1525904097878-94fb15835963"], // Texture
  "paint_5": ["https://images.unsplash.com/photo-1600585154526-990dced4db0d"], // Waterproofing
  "paint_6": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38"], // Furniture Polish
  "paint_7": ["https://images.unsplash.com/photo-1540555700478-4be289fbecef"], // Wood Painting
  "paint_8": ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122"], // Metal Painting
  "paint_9": ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"], // Wall Stencil
  "paint_10": ["https://images.unsplash.com/photo-1581094794329-c8112a89af12"], // Wall Crack
  "paint_11": ["https://images.unsplash.com/photo-1540555700478-4be289fbecef"], // Ceiling Paint
  "paint_12": ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"], // Door Paint
  "paint_13": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"], // Damp Proof
  "paint_14": ["https://images.unsplash.com/photo-1506157786151-b8491531f063"], // Wallpaper
  "paint_15": ["https://images.unsplash.com/photo-1502086223501-7ea6ecd79368"], // Kids Room
  "paint_16": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38"], // Rust Removal

  // === Pest Control Sub-Categories (16 Items) ===
  "pest_1": ["https://images.unsplash.com/photo-1629909613654-28e377c37b09"], // General
  "pest_2": ["https://images.unsplash.com/photo-1587831990711-23ca6441447b"], // Termite
  "pest_3": ["https://images.unsplash.com/photo-1629909613654-28e377c37b09"], // Cockroach
  "pest_4": ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"], // Bed Bug
  "pest_5": ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7"], // Mosquito
  "pest_6": ["https://images.unsplash.com/photo-1629909613654-28e377c37b09"], // Rodent
  "pest_7": ["https://images.unsplash.com/photo-1516528387618-afa90b13e000"], // Ant Control
  "pest_8": ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"], // Spider
  "pest_9": ["https://images.unsplash.com/photo-1629909613654-28e377c37b09"], // Fly
  "pest_10": ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"], // Lizard
  "pest_11": ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38"], // Bee
  "pest_12": ["https://images.unsplash.com/photo-1540555700478-4be289fbecef"], // Wood Borer
  "pest_13": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"], // Bird Netting
  "pest_14": ["https://images.unsplash.com/photo-1515377905703-c4788e51af15"], // Herbal
  "pest_15": ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122"], // Snake
  "pest_16": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"], // Drainage

  // === Maid Sub-Categories (16 Items) ===
  "maid_1": ["https://images.unsplash.com/photo-1581578731548-c64695cc6952"], // Full Time
  "maid_2": ["https://images.unsplash.com/photo-1497366216548-37526070297c"], // Part Time
  "maid_3": ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"], // Cooking
  "maid_4": ["https://images.unsplash.com/photo-1503919005314-30d93d07d823"], // Babysitter
  "maid_5": ["https://images.unsplash.com/photo-1516549655169-df83a0774514"], // Elder Care
  "maid_6": ["https://images.unsplash.com/photo-1584515979956-d9f6e5d09982"], // Patient Care
  "maid_7": ["https://images.unsplash.com/photo-1497215728101-856f4ea42174"], // Office Housekeeping
  "maid_8": ["https://images.unsplash.com/photo-1581578731548-c64695cc6952"], // Commercial
  "maid_9": ["https://images.unsplash.com/photo-1545173168-9f19472b199b"], // Laundry
  "maid_10": ["https://images.unsplash.com/photo-15222906454157-9fa497ef0545"], // Utensil
  "maid_11": ["https://images.unsplash.com/photo-1584622781564-1d987f7333c1"], // Bathroom
  "maid_12": ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"], // Kitchen
  "maid_13": ["https://images.unsplash.com/photo-1484101403633-562f891dc89a"], // Sofa
  "maid_14": ["https://images.unsplash.com/photo-1507136566006-cfc505b114fc"], // Car
  "maid_15": ["https://images.unsplash.com/photo-1538688525198-9b88f6f53126"], // Balcony
  "maid_16": ["https://images.unsplash.com/photo-1616394584738-fc6e612e71b9"], // Disinfection

  // === Installation Sub-Categories (32 Items) ===
  "install_1": ["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"], // House Wiring
  "install_2": ["https://images.unsplash.com/photo-1621905251918-48416bd8575a"], // House Rewiring
  "install_3": ["https://images.unsplash.com/photo-1614036417651-efe5912149d8"], // Socket
  "install_4": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"], // Fan
  "install_5": ["https://images.unsplash.com/photo-1543248939-ff40856f65d4"], // Ceiling Light
  "install_6": ["https://images.unsplash.com/photo-1565814636199-ae8133055c1c"], // LED Light
  "install_7": ["https://images.unsplash.com/photo-1595557424287-2e11e033d4e8"], // DB Install
  "install_8": ["https://images.unsplash.com/photo-1620288627223-53302f4e8c74"], // Inverter
  "install_9": ["https://images.unsplash.com/photo-1555664424-778a1e5e1b48"], // Door Bell
  "install_10": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"], // Earthing
  "install_11": ["https://images.unsplash.com/photo-1620288627223-53302f4e8c74"], // Power Backup
  "install_12": ["https://images.unsplash.com/photo-1558317374-067fb5f30001"], // Exhaust Fan
  "install_13": ["https://images.unsplash.com/photo-1565814636199-ae8133055c1c"], // Decorative Light
  "install_14": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"], // Bathroom Fitting
  "install_15": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"], // Wash Basin
  "install_16": ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"], // Water Tank
  "install_17": ["https://images.unsplash.com/photo-1638202993928-7267aad84c31"], // Water Pump
  "install_18": ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14"], // Shower
  "install_19": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"], // Geyser
  "install_20": ["https://images.unsplash.com/photo-1617113931021-995f514b8a2e"], // RO
  "install_21": ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88"], // Furniture
  "install_22": ["https://images.unsplash.com/photo-1504148455328-c376907d081c"], // Door
  "install_23": ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"], // Bed
  "install_24": ["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c"], // Wooden Shelf
  "install_25": ["https://images.unsplash.com/photo-1593305841991-05c297ba4575"], // TV Unit
  "install_26": ["https://images.unsplash.com/photo-1513694203232-719a280e022f"], // Curtain Rod
  "install_27": ["https://images.unsplash.com/photo-1527689368864-3a821dbccc34"], // AC Install
  "install_28": ["https://images.unsplash.com/photo-1527689368864-3a821dbccc34"], // AC Gas
  "install_29": ["https://images.unsplash.com/photo-1601524909162-be87252be298"], // LED TV
  "install_30": ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"], // CCTV
  "install_31": ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"], // Modular Kitchen
  "install_32": ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"], // Smart Lock
};

// 3. Category Level Fallback Map
export const categoryImages: Record<Category, string[]> = {
  Electrical: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a"],
  Plumbing: ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7"],
  Cleaning: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952"],
  Appliance: ["https://images.unsplash.com/photo-1588508065123-287b28e013da"],
  Carpenter: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88"],
  Painting: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828"],
  PestControl: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09"],
  SaloonWomen: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
  SaloonMen: ["https://images.unsplash.com/photo-1622286342621-4bd786c2447c"],
  Installation: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e"],
  Inspection: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"],
  Checkup: ["https://images.unsplash.com/photo-1484154218962-a197022b5858"],
  General: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952"],
};

export const defaultImages = categoryImages.General;