var confApp = angular.module('confApp', []);
   confApp.factory('sharedData', function () {

    var selectedProduct = localStorage.getItem("tempProduct");
        selectedProduct == null ? selectedProduct = {} : selectedProduct = angular.fromJson(selectedProduct);
    var selectedPeripheral = localStorage.getItem("tempPeripheral");
        selectedPeripheral == null ? selectedPeripheral = {} : selectedPeripheral = angular.fromJson(selectedPeripheral);
        
       var intelAmdProducts=[
                        { 
                            name:"ElixirX",
                            imageURL: "./img/elixirx1.png",
                            price:39000,
                            cpu:'Intel i3 6100',
                            gpu:'GTX 750TI',
                            ram:'8 GB RAM',
                            chipset:'ASUS H110m',
                            psu:'PSU',
                            storage:'1TB Blue',
                            extraStorage:'None',
                            liqCool:'None',
                            productCase:'Available'
                        },
                        {
                            name:"NemesisX",
                            imageURL: "./img/nemesisx1.png",
                            price: 56000,
                            cpu:'Intel i5 4460',
                            gpu:'ASUS GTX 970 (8GB)',
                            ram:'8 GB RAM',
                            chipset:'ASUS z170 Pro Game',
                            psu:'PSU 650W',
                            storage:'1TB Blue',
                            extraStorage:'SSD',
                            liqCool:'None',
                            productCase:'Available'
                        },
                        {
                            name:"ShaftX",
                            imageURL: "./img/shaftx1.png",
                            price: 158000,
                            cpu:'Intel I7 6700',
                            gpu:'MSI FE 1080',
                            ram:'RAM 16GB',
                            chipset:'Asus Maximus VIII Ranger',
                            psu:'PSU',
                            storage:'1TB Black WD',
                            extraStorage:'SSD 240GB',
                            liqCool:'H110i',
                            productCase:'Available'
                            
                        },
                        {
                            name:"ElixirY",
                            imageURL: "./img/elexiry1.png",
                            price: 33000,
                            cpu:'AMD FX4300',
                            gpu:'AMD r7 360',
                            ram:'8 GB RAM',
                            chipset:'ASUS M5A 78L',
                            psu:'PSU',
                            storage:'1TB Blue',
                            extraStorage:'None',
                            liqCool:'Air 1799',
                            productCase:'Available'
                        },
                        {
                            name:"NemesisY",
                            imageURL: "./img/nemesisy1.png",
                            price: 55000,
                            cpu:'AMD FX6300',
                            gpu:'ASUS 4GB R7-370',
                            ram:'None',
                            chipset:'MSI 970G',
                            psu:'PSU Cooler Master 450W',
                            storage:'1TB Blue',
                            extraStorage:'SSD 120 GB',
                            liqCool:'Corsair H45 Closed loop Cooler',
                            productCase:'Available'
                        },
                        {
                            name:"ShaftY",
                            imageURL: "./img/shafty1.png",
                            price: 110000,
                            cpu:'AMD FX 9590',
                            gpu:'RX 480 8GB',
                            ram:'16GB',
                            chipset:'ASUS 990 FXA',
                            psu:'PSU Corsair Rm750W',
                            storage:'1TB Black WD',
                            extraStorage:'SSD 240 GB',
                            liqCool:'H110i',
                            productCase:'Available'
                        },
                    ];
       
       var cart = localStorage.getItem("Cart");
        cart == null ? cart = [] : cart = angular.fromJson(cart)
        
    return {
        getCustomProduct: function () {
                return selectedProduct;
            },
            setCustomProduct: function (product) {
                selectedProduct = product;
                localStorage.setItem("tempProduct",angular.toJson(selectedProduct));
            },
        getPeri: function () {
                return selectedPeripheral;
            },
            setPeri: function (product) {
                selectedPeripheral = product;
                localStorage.setItem("tempPeripheral",angular.toJson(selectedPeripheral));
            },
        getIntelAmdProducts: function () {
                return intelAmdProducts;
            },
        getCart: function () {
                return cart;
            },
            setCart: function(value) {
                cart = value;
                localStorage.setItem("Cart",angular.toJson(cart));
            }
        
    };
});

confApp.controller('cartController', function ($scope,$window,sharedData) {
                
                var intelAmdProducts = sharedData.getIntelAmdProducts();
    
                $scope.buy = function(productname){
                    var products = sharedData.getCart();
                    var product ={};
                    var index=-1;
                    for(var i = 0, len = intelAmdProducts.length; i < len; i++) {
                        if (intelAmdProducts[i].name === productname) {
                            index = i;
                            break;
                        }
                    }
        
                    product = intelAmdProducts[index];
                    products.push(product);
                    sharedData.setCart(products);
                    $window.location.href = 'checkout.php';
                }
                $scope.cust = function(productname){
                    
                    var index=-1;
                    for(var i = 0, len = intelAmdProducts.length; i < len; i++) {
                        if (intelAmdProducts[i].name === productname) {
                            index = i;
                            break;
                        }
                    }
                    var customProduct = intelAmdProducts[index];
                    sharedData.setCustomProduct(customProduct);
                    $window.location.href = 'conf.html';
                    
                }
            }); 
confApp.controller('checkoutController', function checkoutController($scope,$window,sharedData) {
            
                var cart = sharedData.getCart();
                $scope.cart = cart;
                var total=0;
                
//                remove product
                $scope.remove = function(product){
                var index=-1;
                for(var i = 0, len = cart.length; i < len; i++)
                {
                    if (cart[i] == product) {
                        index = i;
                        break;
                        }
                }
                    cart.splice(index,1);
                    sharedData.setCart(cart);
                    total=0;
                    for(var i = 0, len = cart.length; i < len; i++) 
                    {
                        total += Number(cart[i].price);
                    }
                    $scope.totalprice= total;
                    
                }
               
                     for(var i = 0, len = cart.length; i < len; i++)
                        {   
                            total += Number(cart[i].price);
                        }
                     $scope.totalprice= total;
                         
                       
//                    Next Buttons
                    $('#proceed').click(function(e){
                    e.preventDefault();
                    $('#mytabs a[href="#reg"]').tab('show');
                    });
                    $('#proceed1').click(function(e){
                    e.preventDefault();
                    $('#mytabs a[href="#address"]').tab('show');
                    });
                    $('#proceed2').click(function(e){
                    e.preventDefault();
                    $('#mytabs a[href="#payment"]').tab('show');
                    });
        
            });
 confApp.controller('confController', function confController($scope,$window,sharedData)  {
                
//                RAM 
                var ramText=['CORSAIR RAM VALUE 8GB DDR4 2133FSB (8x1) CMV8GX4M1A2133C15','CORSAIR RAM VENGEANCE LPX 16GB DDR4 2400MHZ CMK16GX4M2A2400C16R','CORSAIR RAM VENGEANCE LPX 32GB DDR4 2400MHZ CMK32GX4M4A2400C14','CORSAIR RAM VENGEANCE LPX 32GB DDR4 2666MHZ CMK32GX4M4A2666C15','G.SKILL DESKTOP RAM RIPJAWS 8GB (2 x 4GB) DDR4 2400MHZ (F4-2400C15D-8GRR)','G.SKILL DESKTOP RAM RIPJAWS V 16GB (2 x 8GB) DDR4 2133MHZ (F4-2133C15D-16GVR)','G.SKILL DESKTOP RAM RIPJAWS V 16GB (2 x 8GB) DDR4 2400MHZ (F4-2400C15D-16GVR)','G.SKILL DESKTOP RAM RIPJAWS V 16GB (2 x 8GB) DDR4 2666MHZ (F4-2666C15D-16GVR','G.SKILL DESKTOP RAM RIPJAWS V 16GB (2 X 8GB) DDR4 3000MHZ (F4-3000C15D-16GVRB)','G.SKILL DESKTOP RAM RIPJAWS V 4GB (1 X 4GB) DDR4 2133MHZ (F4-2133C15S-4GVR)','G.SKILL DESKTOP RAM RIPJAWS V 8GB (1 X 8GB) DDR4 2133MHZ (F4-2133C15S-8GVR)','G.SKILL DESKTOP RAM RIPJAWS V 8GB (1 x 8GB) DDR4 2400MHZ (F4-2400C15S-8GVR)','G.SKILL DESKTOP RAM TRIDENT Z 16GB (2 X 8GB) DDR4 3000MHZ (F4-3000C15D-16GTZB)','G.SKILL DESKTOP RAM TRIDENT Z 16GB (2 X 8GB) DDR4 3200MHZ (F4-3200C16D-16GTZB)','G.SKILL LAPTOP RAM 8GB (1 x 8GB) DDR4 2133MHZ (F4-2133C15S-8GRS)','KINGSTON RAM HYPERX FURY 8GB DDR4 2133FSB HX421C14FB/8'];
                var ram_prices={"4M1A2133C15":2620,
                               "4M2A2400C16R":6899,
                               "4M4A2400C14":41200,
                               "4M4A2666C15":35397,
                               "F4-2400C15D-8G":3670,
                               "F4-2133C15D-16G":6510,
                               "F4-2400C15D-16G":7100,
                               "F4-2666C15D-16G":9846,
                               "F4-3000C15D-16G":7634,
                               "F4-2133C15S-4G":2550,
                               "F4-2133C15S-8G":3625,
                               "F4-2400C15S-8G":2850,
                               "F4-3000C15D-16GTZB":9350,
                               "F4-3200C16D-16G":9200,
                               "F4-2133C15S-8GRS":4100,
                               "HX421C14FB/8":3100};
                var ram_keys = [];
                for (var key in ram_prices) {
                  if (ram_prices.hasOwnProperty(key)) {
                    ram_keys.push(key);
                  }
                }
     
                var ramOptions = [];
                for(var i=0;i<ramText.length;i++){
                var obj = {}
                obj.text=ramText[i];
                obj.name="ram";
                obj.id=ram_keys[i];
                ramOptions.push(obj);
                }
     
                var cpuText = ['INTEL PROCESSOR PENTIUM DUAL CORE G4400','INTEL PROCESSOR CORE i3-6098P',
                               'INTEL PROCESSOR CORE i3-6100','INTEL PROCESSOR CORE i5 6402P',
                               'INTEL PROCESSOR CORE i5 6400','INTEL PROCESSOR CORE i5 6500',
                               'INTEL PROCESSOR CORE i5 6600K','INTEL PROCESSOR CORE i5 6600',
                               'INTEL PROCESSOR CORE i7 6700','INTEL PROCESSOR CORE i7 6700K',
                               'IINTEL PROCESSOR CORE i7 6800K','INTEL PROCESSOR CORE i7 6950X',
                               'INTEL PROCESSOR CORE i7 6900K'];
                var cpu_prices = {
                                    "G4400":4600,
                                    "i3-6098P":8000,
                                    "i3-6100":8600,
                                    "i5 6402P":13400,
                                    "i5 6400":13500,
                                    "i5 6500":15300,
                                    "i5 6600K":18400,
                                    "i5 6600":16900,
                                    "i7 6700":23400,
                                    "i7 6700K":26300,
                                    "i7 6800K":34600,
                                    "i7 6905X":135000,
                                    "i7 6900K":85000
                                 };
                var cpu_keys = [];
                for (var key in cpu_prices) {
                  if (cpu_prices.hasOwnProperty(key)) {
                    cpu_keys.push(key);
                  }
                }
                
                var cpuOptions = [];
                for(var i=0;i<cpuText.length;i++){
                var obj = {}
                obj.text=cpuText[i];
                obj.name="cpu";
                obj.id=cpu_keys[i];
                cpuOptions.push(obj);
                }
                    
     //psuOptions
      var psuText = ['COOLER MASTER THUNDER 500W',
'COOLER MASTER B600 VER.2 600W ','COOLER MASTER GM SERIES 550W SEMI MODULAR','CORSAIR CX430 430 W','CORSAIR VS550 550W','CORSAIR VS650 650W','CORSAIR CX SERIES CX600 600W',
'COOLER MASTER GM SERIES 650W SEMI MODULAR', 
'COOLER MASTER GM SERIES 750W', 
'COOLER MASTER V850 850W FULLY MODULAR', 
'COOLER MASTER V1200 PLATINUM 1200W', 
'COOLER MASTER V1200 1200W FULLY MODULAR', 
'CORSAIR CSM SERIES CS650M 650W SEMI MODULAR', 
'CORSAIR CSM SERIES CS750M 750W SEMI MODULAR', 
'CORSAIR RM SERIES RM650 650W  FULLY MODULAR', 
'CORSAIR RM650X 650W FULLY MODULAR', 
'CORSAIR CX SERIES CX850M 750W  SEMI MODULAR', 
'CORSAIR RM SERIES RM750 750W FULLY MODUALAR', 
'CORSAIR RM850X 850W FULLY MODULAR', 
'CORSAIR RM SERIES RM850 850W 80 PLUS GOLD MODULAR', 
'CORSAIR HXI HX750I 750W', 
'CORSAIR AXI SERIES AX1500I 1500 WATT', 
'CORSAIR AXI SERIES AX1200I 1200 WATT', 
'CORSAIR AX SERIES AX860I 760W', 
'CORSAIR AX SERIES AX760 760W', 
'CORSAIR HXI HX1000I 1000W', 
'CORSAIR RM1000X 1000W FULLY MODULAR'];
     
                var psu_prices = {
                                    "psu1":3500,
                                    "psu2":4600,
                                    "psu3":5600,
                                    "psu4":3000,
                                    "psu5":3150,
                                    "psu6":4100,
                                    "psu7":5600,
                                    "psu8":7200,
                                    "psu9":8300,
                                    "psu10":12700,
                                    "psu11":21700,
                                    "psu12":7000,
                                    "psu13":7400,
                                    "psu14":7800,
                                    "psu15":8500,
                                    "psu16":8500,
                                    "psu17":8700,
                                    "psu18":10800,
                                    "psu19":12300,
                                    "psu20":35500,
                                    "psu21":23900,
                                    "psu22":18400,
                                    "psu23":16200,
                                    "psu24":16200,
                                    "psu25":12700
                                 };
                var psu_keys = [];
                for (var key in psu_prices) {
                  if (psu_prices.hasOwnProperty(key)) {
                    psu_keys.push(key);
                  }
                }
                
                var psuOptions = [];
                for(var i=0;i<psuText.length;i++){
                var obj = {}
                obj.text=psuText[i];
                obj.name="psu";
                obj.id=psu_keys[i];
                psuOptions.push(obj);
                }
                
//                Custom Options
                $scope.tabs1 = [
                                {
                                  id: 'CPU',
                                  options: cpuOptions
                                },
                                {
                                  id: 'CHASIS',
                                  options:[
                                      {
                                      id: '',
                                      val: '',
                                      name:'chasis',
                                      text: '4 options will be given to you for each of the models.'
                                    }
                                  ]
                                },
                                {
                                  id: 'MOTHERBOARD',
                                  options:[
                                      {
                                      id: '',
                                      val: '',
                                      name:'mthr_board',
                                      text: 'Coming Soon!'
                                    }
                                  ]
                                },
                                {
                                  id: 'POWER SUPPLY',
                                  options:psuOptions
                                },
                    
                                {
                                  id: 'GPU',
                                  options:[
                                      {
                                      id: '',
                                      val: '',
                                    name:'gpu',
                                      text: 'Coming Soon!'
                                      }
                                  ]
                                },
                                {
                                  id: 'OPTICAL DRIVE',
                                  options:[
                                      {
                                      id: 'BW-16D1HT',
                                      val: '',
                                    name:'optdrive',
                                      text: 'ASUS Black 16X SATA Internal Blu-Ray Burner BW-16D1HT'
                                      },
                                      {
                                      id: 'SDRW-08D2S-U',
                                      val: '',
                                    name:'optdrive',
                                      text: 'ASUS SDRW-08D2S-U LITE Slim External DVD Writer '
                                      }
                                  ]
                                },
                                {
                                  id: 'OPERATING SYSTEM',
                                  options:[
                                      {
                                      id: 'db60',
                                      val: '8500',
                                    name:'os',
                                      text: 'MICROSOFT WINDOWS 10 32 BIT/64 BIT BOX PAC'
                                      }
                                  ]
                                },
                                {
                                  id: 'RAM',
                                  options: ramOptions
                                },
                                {
                                  id: 'MVRK GLO CUSTOM RGB LIGHTING KIT',
                                  options:[
                                      {
                                      id: 'glowkit',
                                      val: '',
                                    name:'rgbkit',
                                      text: '1999'
                                      }
                                  ]
                                },
                                {
                                  id: 'MVRK LED STRIPS',
                                  options:[
                                      {
                                      id: '',
                                      val: '200',
                                    name:'led',
                                      text: 'High Quality Red LED strips -(QTY 4)'
                                      },
                                      {
                                      id: '',
                                      val: '200',
                                    name:'led',
                                      text: 'High Quality White LED strips -(QTY 4)'
                                      },
                                      {
                                      id: '',
                                      val: '200',
                                    name:'led',
                                      text: 'High Quality Blue LED strips -(QTY 4)'
                                      },
                                      {
                                      id: '',
                                      val: '200',
                                    name:'led',
                                      text: 'High Quality Green LED strips -(QTY 4)'
                                      }
                                      
                                  ]
                                },
                                {
                                  id: 'PROCESSOR AIR COOLERS',
                                  options:[
                                      {
                                  id: 'hyper103',
                                  val: '',
                                  name:'air_cooler',
                                  text: 'COOLER MASTER CPU AIR COOLER HYPER 103'
                                          
                                },
                                   {  
                                  id: '212x',
                                  val: '',
                                  name:'air_cooler',
                                  text: 'COOLER MASTER CPU AIR COOLER HYPER 212X'
                                },
                                      {
                                  id: 'air8',
                                  val: '',
                                  name:'air_cooler',
                                  text: 'COOLER MASTER CPU AIR COOLER MASTER MAKER AIR 8'
                                }
                                  ]
                                },
                                {
                                  id: 'CLOSED LOOP LIQUID COOLING',
                                  options:[
                                          {
                                      id: '120v',
                                      val: '4900',
                                      name:'liqcool',
                                      text: 'COOLER MASTER CPU LIQUID COOLER SEIDON 120V PLUS'
                                    },
                                          {
                                      id: '240m',
                                      val: '8900',
                                      name:'liqcool',
                                      text: 'COOLER MASTER CPU LIQUID COOLER SEIDON 240M'
                                    },
                                      {
                                      id: 'gtx',
                                      val: '8600',
                                      name:'liqcool',
                                      text: 'CORSAIR CPU LIQUID COOLER H100i GTX'
                                    },
                                      {
                                      id: 'gt280mm',
                                      val: '9400',
                                      name:'liqcool',
                                      text: 'CORSAIR CPU LIQUID COOLER H110i GT 280MM EXTREME PERFORMANCE'
                                    },
                                      {
                                      id: 'h80igt',
                                      val: '7600',
                                      name:'liqcool',
                                      text: 'CORSAIR CPU LIQUID COOLER H80i GT'
                                    },
                                      {
                                      id: 'gtx280mmxp',
                                      val: '9500',
                                      name:'liqcool',
                                      text: 'CORSAIR CPU LIQUID COOLER H110i GTX 280mm Extreme Performance'
                                    },
                                      {
                                        id: 'none',
                                      val: '0',
                                      name:'liqcool',
                                      text: 'None' 
                                        }
                                  ]
                                },
                                      {
                                  id: 'MVRK CUSTOM SLEEVE CABLE',
                                  options:[
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Basic Cable Extension Kit – 6+6 Pin Series GREEN'
                                    },
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Basic Cable Extension Kit – 6+6 Pin Series WHITE'
                                    },
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Cable Extension Kit – 6+6 Pin Series RED'
                                    },
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Basic Cable Extension Kit – 6+6 Pin Series BLUE'                                   },
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Basic Cable Extension Kit – 8+6 Pin Series BLACK / RED'
                                      },
                                      {
                                  id: '',
                                  val: '',
                                  name:'cable',
                                  text: 'Basic Cable Extension Kit – 8+6 Pin Series BLACK / WHITE'
                                      }
                                      
                                      ]
                                }
                            ];
                
                
                var hddText= ['1TB Seagate Desktop HDD 7200rpm 64MB Cache','WD HARD DISK 1TB SATA BLUE','WESTERN DIGITAL (WD) 7200 RPM DESKTOP HDD 1TB CAVIAR BLACK','2TB Seagate Desktop HDD 7200rpm 64MB Cache','WD HARD DISK 2TB BLUE','4TB Seagate Desktop HDD 5200rpm 64MB Cache','6TB Seagate Desktop HDD 7200rpm 64MB Cache','2TB Western Digital Caviar RE 7200rpm 64MB Cache','4TB Western Digital Caviar RE 7200rpm 64MB Cache','6TB Western Digital Caviar RE 7200rpm 64MB Cache'];
                
                var ssdText=['KINGSTON SSD UV300 120 GB','Kingston UV400 120GB SSD','Kingston UV400 480GB SSD','SANDISK INTERNAL SSD PLUS SERIES 120 GB','SANDISK INTERNAL SSD PLUS SERIES 240 GB','SAMSUNG INTERNAL 2.5­INCH SATA SSD 750 EVO 120GB','250GB Samsung® 850 EVO [520MB/s Sequential Reads]',' 500GB Samsung® 850 EVO [520MB/s Sequential Reads]','1TB Samsung® 850 EVO [520MB/s Sequential Reads]','2TB Samsung® 850 EVO [520MB/s Sequential Reads]','256GB Samsung® 850 Pro [550MB/s Sequential Reads]','512GB Samsung® 850 Pro [550MB/s Sequential Reads]','1TB Samsung® 850 Pro [550MB/s Sequential Reads]'];
                var ssd_prices={
                    "ssd0":2949,
                    "ssd1":3100,
                    "ssd2":9000,
                    "ssd3":3449,
                    "ssd4":5449,
                    "ssd5":3249,
                    "ssd6":6949,
                    "ssd7":13649,
                    "ssd8":25800,
                    "ssd9":59766,
                    "ssd10":10600,
                    "ssd11":18600,
                    "ssd12":33800
                    };
                var ssd_keys = [];
                for (var key in ssd_prices) {
                  if (ssd_prices.hasOwnProperty(key)) {
                    ssd_keys.push(key);
                  }
                }
     
                var ssdOptions = [];
                for(var i=0;i<ssdText.length;i++){
                var obj = {}
                obj.text=ssdText[i];
                obj.name="ssd";
                obj.id=ssd_keys[i];
                ssdOptions.push(obj);
                }
                var pcieText=['400GB Intel® 750 Series [2,400MB/s Sequential Reads]','1.2TB Intel® 750 Series [2,400MB/s Sequential Reads]'];
                var pcie_prices={
                    "400GB Intel 750 Series":35200,
                    "1.2TB Intel 750 Series":98500,
                    "800GB Intel 750 Series":4499
                    };
                var pcie_keys = [];
                for (var key in pcie_prices) {
                  if (pcie_prices.hasOwnProperty(key)) {
                    pcie_keys.push(key);
                  }
                }
     
                var pcieOptions = [];
                for(var i=0;i<pcieText.length;i++){
                var obj = {}
                obj.text=pcieText[i];
                obj.name="pcie";
                obj.id=pcie_keys[i];
                pcieOptions.push(obj);
                }
                var m2Text=['SAMSUNG INTERNAL 850 EVO SERIES M2 MSATA SSD 250 GB','SAMSUNG INTERNAL 850 EVO SERIES M2 MSATA SSD 500 GB','256GB Samsung® 950 Pro [2,500MB/s Sequential Reads]','512GB Samsung® 950 Pro [2,500MB/s Sequential Reads]'];
                var m2_prices={
                    "MSATA SSD 250 GB":8399,
                    "MSATA SSD 500 GB":14699,
                    "256GB Samsung 950 Pro":16944,
                    "512GB Samsung 950 Pro":29216
                    };
                var m2_keys = [];
                for (var key in m2_prices) {
                  if (m2_prices.hasOwnProperty(key)) {
                    m2_keys.push(key);
                  }
                }
     
                var m2Options = [];
                for(var i=0;i<m2Text.length;i++){
                var obj = {}
                obj.text=m2Text[i];
                obj.name="m2";
                obj.id=m2_keys[i];
                m2Options.push(obj);
                }
                
                $scope.stors = [
                    {
                        id:'HDD',
                        options:[
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text: hddText[0]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[1]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[2]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[3]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[3]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[4]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[5]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[6]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[7]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[8]
                            },
                            {
                                id:'',
                                name:'hdd',
                                value:'',
                                text:hddText[9]
                            }
                            
                        ]
                    },
                    {
                        id:'SSD',
                        options:ssdOptions
                    },
                    {
                        id:'PCIE',
                        options:pcieOptions
                    },
                    {
                        id:'M.2 DRIVES',
                        options:m2Options
                    }
                ];
                var aircooler_prices={"hyper103":"1900","212x":"3000","air8":"12500","none":0};
                 var liqcooler_prices={"120v":4900,"240m":8900,"gtx":8600,"gt280mm":9400,"h80igt":7600,"gtx280mmxp":9500,"none":0};
                var optdrives_prices={"BW-16D1HT":9100,"SDRW-08D2S-U":2000,"none":0}
                    
                var selectedProduct =  sharedData.getCustomProduct();
               $scope.productSelected = selectedProduct;
                var addOns={};
                var addOnsName = {}
                $scope.addOns = addOns;
                $scope.addOnsName = addOnsName;
     
     
                var cpu_Price = 0; var od_Price = 0;
                var chasis_Price = 0;var os_Price = 0;
                var gpu_Price = 0;var ram_Price = 0;
                var mthrbd_Price = 0; var ps_Price = 0;
                var aircoolers_Price = 0; var liqCool_Price = 0;
                var cable_Price = 0; var glowKit_Price = 0;
                var led_Price = 0;var storage_Price = 0;
                var basePrice = Number(selectedProduct.price);
                var totalprice = basePrice
                $scope.totalprice = totalprice
                
                $scope.out = function(){
                    var cart = sharedData.getCart();
                    //console.log(selectedProduct);
                    cart.push(selectedProduct);
                    sharedData.setCart(cart);
                    $window.location.href = 'checkout.php';
                }
                $scope.cal = function(){
                    if($('input[name=ram]').is(':checked'))
                    { ram_Price = Number(ram_prices[$('input[name=ram]:checked').attr('id')]);
                      selectedProduct.ram = $('input[name=ram]:checked').attr('value');
                    };
                    if($('input[name=cpu]').is(':checked'))
                    { cpu_Price = Number(cpu_prices[$('input[name=cpu]:checked').attr('id')]);
                      selectedProduct.cpu = $('input[name=cpu]:checked').attr('value');
                    };
                    if($('input[name=psu]').is(':checked'))
                    { ps_Price = Number(psu_prices[$('input[name=psu]:checked').attr('id')]);
                      selectedProduct.psu = $('input[name=psu]:checked').attr('value');
                    };
                    if($('input[name=liqcool]').is(':checked'))
                    { liqCool_Price = Number(liqcooler_prices[$('input[name=liqcool]:checked').attr('id')]);
                      selectedProduct.liqCool = $('input[name=liqcool]:checked').attr('value');
                    };
                    
                    //addOns
                    if($('input[name=optdrive]').is(':checked'))
                    { od_Price = Number( optdrives_prices[$('input[name=optdrive]:checked').attr('id')]);
                        selectedProduct.optdrive = $('input[name=optdrive]:checked').attr('value');
                        addOns.optDrive = selectedProduct.optdrive;
                        addOnsName.optDrive = "OPTICAL DRIVE"
                    };
                    if($('input[name=air_cooler]').is(':checked'))
                    { aircoolers_Price = Number(aircooler_prices[$('input[name=air_cooler]:checked').attr('id')]);
                        selectedProduct.airCooler = $('input[name=air_cooler]:checked').attr('value');
                        addOns.airCooler = selectedProduct.airCooler;
                        addOnsName.airCooler = "AIR Cooler"
                    };
                    
                    if($('input[name=cable]').is(':checked'))
                    { cable_Price = 200;
                        selectedProduct.cable = $('input[name=cable]:checked').attr('value');
                        addOns.cable = selectedProduct.cable;
                        addOnsName.cable = "Cable"
                    };
                    if($('input[name=rgbkit]').is(':checked'))
                    { glowKit_Price = 1999;
                    selectedProduct.glowKit = $('input[name=rgbkit]:checked').attr('value');
                     addOns.glowKit = selectedProduct.glowKit;
                        addOnsName.glowKit = "Glow Kit"
                    };
                    if($('input[name=led]').is(':checked'))
                    { led_Price = 200;
                        selectedProduct.led = $('input[name=led]:checked').attr('value');
                        addOns.led = selectedProduct.led;
                        addOnsName.led = "LED"
                    };
                    if($('input[name=m2]').is(':checked'))
                    {   storage_Price = Number(m2_prices[$('input[name=m2]:checked').attr('id')]);
                        selectedProduct.extraStorage = $('input[name=m2]:checked').attr('value');
                    };
                    if($('input[name=pcie]').is(':checked'))
                    {   storage_Price = Number(pcie_prices[$('input[name=pcie]:checked').attr('id')]);
                        selectedProduct.extraStorage = $('input[name=pcie]:checked').attr('value');
                    };
                    if($('input[name=ssd]').is(':checked'))
                    {   storage_Price = Number(ssd_prices[$('input[name=ssd]:checked').attr('id')]);
                        selectedProduct.extraStorage = $('input[name=ssd]:checked').attr('value');
                    };
                    
                    $scope.totalprice = basePrice+cpu_Price+storage_Price+od_Price+chasis_Price+os_Price+gpu_Price+glowKit_Price+ram_Price+mthrbd_Price+ps_Price+aircoolers_Price+liqCool_Price+cable_Price+led_Price;
                    selectedProduct.price = $scope.totalprice;
                }
            });

confApp.controller('peripheralController',function ($scope,$http,$window,sharedData) {

   $http.get('json/mouse.json').then(function(response) {
      $scope.mouseProducts = response.data.mouse;
  });
    $http.get('json/keyboards.json').then(function(response) {
      $scope.keyboardProducts = response.data.keyboards;
  });
    
    $scope.open = function(mouse){
        sharedData.setPeri(mouse);
        $window.location.href = 'mouseProductPage.html';
    }
    $scope.open1 = function(keyboard){
        sharedData.setPeri(keyboard);
        $window.location.href = 'keyboardProductPage.html';
    }
});

confApp.controller('mouseController',function ($scope,$http,$window,sharedData) {
       
    var mouse = sharedData.getPeri();
    $scope.mouse = mouse;
    $scope.buy = function(){
                    var products = sharedData.getCart();
                    products.push(mouse);
                    sharedData.setCart(products);
                    $window.location.href = 'checkout.php';      
                } 
     $scope.changeImage = function(image){
            $scope.mouse.imageURL = image;
        }
});
confApp.controller('keyboardController',function ($scope,$http,$window,sharedData) {
       
    var keyboard = sharedData.getPeri();
    $scope.keyboard = keyboard;
    $scope.buy = function(){
                    var products = sharedData.getCart();
                    products.push(keyboard);
                    sharedData.setCart(products);
                    $window.location.href = 'checkout.php';
    }
    $scope.changeImage = function(image){
            $scope.keyboard.imageURL = image;
        }
});