const allBuildings = {
  "Administration": [
    {
      "type": "EActivityType.administration",
      "occupation": "Town governor",
      "buildings": [
        {
          "name": "Town Hall",
          "description": "Administrative center for local government and community affairs",
          "model_name": "XG_Town-Hall",
          "ground_segment": "11 x 11",
          "building_shape": "L-Shape",
          "building_floors": "1"
        }
      ]
    }
  ],
  // "Social Centers": [
  //   {
  //     "type": "EActivityType.social",
  //     "occupation": "Guild Master",
  //     "buildings": [
  //       {
  //         "name": "Guildhall",
  //         "description": "Meeting place for local craftsmen and merchants",
  //         "ground_segment": "",
  //         "building_shape": "",
  //         "building_floors": "1"
  //       }
  //     ]
  //   }
  // ],
  "Residential": [
    {
      "type": "EActivityType.residential",
      "occupation": "Resident",
      "buildings": [
        {
          "name": "Small House",
          "description": "Small house for a single family",
          "model_name": "XG_Small-house",
          "ground_segment": "5 x 5",
          "building_shape": "L-Shape",
          "building_floors": "1"
        },
        {
          "name": "Medium House",
          "description": "Medium house for a family",
          "model_name": "XG_Medium-house",
          "ground_segment": "9 x 9",
          "building_shape": "L-Shape",
          "building_floors": "1"
        },
        {
          "name": "Large House",
          "description": "Large house for a wealthy family",
          "model_name": "XG_Large-house",
          "ground_segment": "11 x 11",
          "building_shape": "L-Shape",
          "building_floors": "1"
        },
        {
          "name": "Mansion",
          "description": "Large residence for wealthy individuals or families",
          "model_name": "XG_Mansion",
          "ground_segment": "11 x 11",
          "building_shape": "π-Shape",
          "building_floors": "1"
        },
        {
          "name": "Field Hut",
          "description": "Shelter in the fields for workers, providing shade and rest during the day",
          "model_name": "XG_Field-Hut",
          "ground_segment": "5 x 5",
          "building_shape": "Square-Shape",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Education": [
    {
      "type": "EActivityType.education",
      "occupation": "Teacher",
      "buildings": [
        {
          "name": "Village School",
          "description": "A simple schoolhouse for teaching children basic reading, writing, and arithmetic.",
          "model_name": "XG_Village-School",
          "ground_segment": "9 x 9",
          "building_shape": "L-Shape",
          "building_floors": "1"
        },
        {
          "name": "Scholars Hall",
          "description": "A more advanced place of learning, where scribes, philosophers, or scholars gather for higher education and research.",
          "model_name": "XG_Scholars-Hall",
          "ground_segment": "9 x 9",
          "building_shape": "T-Shape",
          "building_floors": "1"
        },
        {
          "name": "Library",
          "description": "Repository of books and scrolls, providing access to knowledge for students, scholars, and the curious.",
          "model_name": "XG_Library",
          "ground_segment": "9 x 9",
          "building_shape": "L-Shape",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Community & Leisure": [
    {
      "type": "EActivityType.communityLeisure",
      "occupation": "Entertainer",
      "buildings": [
        {
          "name": "Theater",
          "description": "A stage and seating area for performances and public events",
          "model_name": "XG_Theater",
          "ground_segment": "11 x 11",
          "building_shape": "Open Air podium",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.communityLeisure",
      "occupation": "Innkeeper",
      "buildings": [
        {
          "name": "Inn",
          "description": "Lodging for travelers and a social gathering place",
          "model_name": "XG_Inn",
          "ground_segment": "11 x 11",
          "building_shape": "H-Shape",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.communityLeisure",
      "occupation": "Bathkeeper",
      "buildings": [
        {
          "name": "Bathhouse",
          "description": "Community bathing facility for hygiene and relaxation",
          "model_name": "XG_Bathhouse",
          "ground_segment": "9 x 9",
          "building_shape": "L-Shape",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.communityLeisure",
      "occupation": "Bartender",
      "buildings": [
        {
          "name": "Tavern",
          "description": "Community house for food, drink, and socializing",
          model_name: "XG_Tavern",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.communityLeisure",
      "occupation": "Alehouse Keeper",
      "buildings": [
        {
          "name": "Alehouse",
          "description": "Small establishment serving beer and simple food",
          "model_name": "XG_Alehouse",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Food Processing": [
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Baker",
      "buildings": [
        {
          "name": "Bakery",
          "description": "Baking bread and pastries",
          "model_name": "XG_Baker",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Butcher",
      "buildings": [
        {
          "name": "Butcher Shop",
          "description": "Meat processing",
          model_name: "XG_Butcher",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Brewer",
      "buildings": [
        {
          "name": "Brewery",
          "description": "Brewing beer and other alcoholic beverages",
          model_name: "XG_Brewery",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Cheesemaker",
      "buildings": [
        {
          "name": "Dairyhouse",
          "description": "Producing various types of cheese",
          model_name: "XG_Dairyhouse",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Hunting": [
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Hunter",
      "buildings": [
        {
          "name": "Hunter's Lodge",
          "description": "Shelter and base for hunters to prepare and store game",
          model_name: "XG_Hunters-Hut",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Milling": [
    // {
    //   "type": "EActivityType.foodProducers",
    //   "occupation": "Water Miller",
    //   "buildings": [
    //     {
    //       "name": "Water Mill",
    //       "description": "Water mill for grinding grain",
    //       "ground_segment": "",
    //       "building_shape": "",
    //       "building_floors": "1"
    //     }
    //   ]
    // },
    {
      "type": "EActivityType.foodProducers",
      "occupation": "Wind Miller",
      "buildings": [
        {
          "name": "Wind Mill",
          "description": "Wind mill for grinding grain",
          model_name: "XG_Wind-Mill",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Workshops & Processing": [
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Sawyer",
      "buildings": [
        {
          "name": "Sawmill",
          "description": "Sawmill for processing logs into lumber or planks",
          model_name: "XG_Sawmill",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Ore Smelter",
      "buildings": [
        {
          "name": "Basic Ore Smelter",
          "description": "Processing raw ores into usable metals",
          model_name: "XG_Smelter",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Ore Smelter",
      "buildings": [
        {
          "name": "Special Ore Smelter",
          "description": "Processing raw ores into usable metals",
          model_name: "XG_Smelter",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Ore Smelter",
      "buildings": [
        {
          "name": "Precious Ore Smelter",
          "description": "Processing raw ores into usable metals",
          model_name: "XG_Smelter",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Blacksmith",
      "buildings": [
        {
          "name": "Blacksmith",
          "description": "Basic metal working shop for crafting tools and processing metals",
          model_name: "XG_Blacksmith",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Potter",
      "buildings": [
        {
          "name": "Potter",
          "description": "Crafting pottery, ceramics, and earthenware",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Tailor",
      "buildings": [
        {
          "name": "Tailor",
          "description": "Designing, sewing, and mending clothing",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Tanner",
      "buildings": [
        {
          "name": "Tanner",
          "description": "Treating animal hides to make leather",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Carpenter",
      "buildings": [
        {
          "name": "Carpenter's Workshop",
          "description": "Workshop for crafting furniture, barrels, and wooden tools",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Wheelwright",
      "buildings": [
        {
          "name": "Wheelwright's Workshop",
          "description": "Workshop specialized in making wheels, carts, and wagons",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.craftsmen",
      "occupation": "Mason",
      "buildings": [
        {
          "name": "Mason's Workshop",
          "description": "Workshop for shaping stone for construction and decoration",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Commercial": [
    {
      "type": "EActivityType.merchant",
      "occupation": "Seller",
      "buildings": [
        {
          "name": "Small Market",
          "description": "Smaller marketplace for local trade",
          model_name: "XG_Small-Market",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        },
        {
          "name": "Medium Market",
          "description": "Large marketplace for trading goods",
          model_name: "XG_Medium-Market",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        },
        {
          "name": "Large Market",
          "description": "Large marketplace for trading goods",
          model_name: "XG_Large-Market",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Mining": [

    {
      "type": "EActivityType.miner",
      "occupation": "Clay Miner",
      "buildings": [
        {
          "name": "Clay Mine",
          "description": "Clay mine for extracting clay",
          model_name: "XG_Mine-clay",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.miner",
      "occupation": "Coal Miner",
      "buildings": [
        {
          "name": "Coal Mine",
          "description": "Coal mine for extracting coal",
          model_name: "XG_Mine-coal",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.miner",
      "occupation": "Basic Metal Miner",
      "buildings": [
        {
          "name": "Basic Metal Mine",
          "description": "Basic metal mine for extracting basic metals like coal, iron, and copper",
          model_name: "XG_Mine-Basic-Metal",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.miner",
      "occupation": "Special Metal Miner",
      "buildings": [
        {
          "name": "Special Metal Mine",
          "description": "Special metal mine for extracting special metals like tin and lead",
          model_name: "XG_Mine-copper",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.miner",
      "occupation": "Precious Metal Miner",
      "buildings": [
        {
          "name": "Precious Metal Mine",
          "description": "Precious metal mine for extracting precious metals like silver and gold",
          model_name: "XG_Mine-Precious-Metal",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Religious Institutions": [
    {
      "type": "EActivityType.religious",
      "occupation": "Priest",
      "buildings": [
        {
          "name": "Church",
          "description": "Place of worship",
          model_name: "XG_Church",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.religious",
      "occupation": "Monk",
      "buildings": [
        {
          "name": "Monastery",
          "description": "Religious community for monks or nuns",
          model_name: "XG_Monastery",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Funerary": [
    {
      "type": "EActivityType.religious",
      "occupation": "Sexton",
      "buildings": [
        {
          "name": "Graveyard",
          "description": "Burial ground for the deceased",
          model_name: "XG_Sexton",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Storage & Warehousing": [
    {
      "type": "EActivityType.storageKeeper",
      "occupation": "Granary Keeper",
      "buildings": [
        {
          "name": "Small Granary Storage",
          "description": "Storage for grains and crops, typically used by a small farm or household",
          "model_name": "XG_Small-barn",
          "ground_segment": "5 x 5",
          "building_shape": "Square-Shape",
          "building_floors": "1"
        },
        {
          "name": "Medium Granary Storage",
          "description": "Storage for grains and crops, typically used by a Medium-sized farm or village",
          "model_name": "XG_Medium-barn",
          "ground_segment": "7 x 7",
          "building_shape": "Square-Shape",
          "building_floors": "1"
        },
        {
          "name": "Large Granary Storage",
          "description": "Storage for grains and crops, typically used by a large farm or town",
          "model_name": "XG_Big-barn",
          "ground_segment": "9 x 9",
          "building_shape": "Square-Shape",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Water Management": [
    {
      "type": "EActivityType.waterSupplier",
      "occupation": "Water Supplier",
      "buildings": [
        {
          "name": "Small Well",
          "description": "Smaller well for accessing groundwater",
          model_name: "XG_Well",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        },
        {
          "name": "Medium Well",
          "description": "Deep well for accessing groundwater",
          model_name: "XG_Well",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        },
        {
          "name": "Large Well",
          "description": "Deep well for accessing groundwater",
          model_name: "XG_Well",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Medical Facilities": [
    {
      "type": "EActivityType.medicinal",
      "occupation": "Herbalist",
      "buildings": [
        {
          "name": "Herbalist's Hut",
          "description": "Shelter for identifying, gathering, and processing medicinal and culinary herbs for remedies and potions.",
          model_name: "XG_Herbalists-Hut",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.medicinal",
      "occupation": "Healer",
      "buildings": [
        {
          "name": "Healer's Hut",
          "description": "A modest home or hut where a local healer treats wounds and illnesses with herbal remedies and folk medicine.",
          model_name: "XG_Healers-Hut",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.medicinal",
      "occupation": "Caregiver",
      "buildings": [
        {
          "name": "Sick House",
          "description": "A simple communal house for resting and caring for the ill or wounded, managed by local caregivers.",
          model_name: "XG_Caregiver",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ],
  "Gathering": [
    {
      "type": "EActivityType.gathering",
      "occupation": "Lumberjack",
      "buildings": [
        {
          "name": "Small Lumberjack's Hut",
          "description": "Small shelter for lumberjacks",
          model_name: "XG_Lumberjack",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    },
    {
      "type": "EActivityType.gathering",
      "occupation": "Forager",
      "buildings": [
        {
          "name": "Forager's Camp",
          "description": "Base camp for gathering edible wild plants, berries, nuts, and mushrooms used for food and basic needs.",
          model_name: "XG_Forager",
          "ground_segment": "",
          "building_shape": "",
          "building_floors": "1"
        }
      ]
    }
  ]
}