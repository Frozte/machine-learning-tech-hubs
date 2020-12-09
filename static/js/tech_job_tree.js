      google.charts.load('current', {'packages':['treemap']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Parent', 'Total Tech Employment'],
          ['Tech Hub Cities',    null,                 0],
          ['Atlanta',   'Tech Hub Cities',             0],
          ['Austin',    'Tech Hub Cities',             0],
          ['New York City',      'Tech Hub Cities',             0],
          ['San Francisco', 'Tech Hub Cities',             0],
          ['Dallas', 'Tech Hub Cities',             0],
          ['Raleigh', 'Tech Hub Cities',             0],
          ['San Jose', 'Tech Hub Cities',             0],
          ['Charlotte', 'Tech Hub Cities',             0],
          ['Seattle', 'Tech Hub Cities',             0],
          ['Huntsville', 'Tech Hub Cities',             0],
          ['Denver', 'Tech Hub Cities',             0],
          ['Boston', 'Tech Hub Cities',             0],
          ['Trenton', 'Tech Hub Cities',             0],
          
          
          // ATLANTA
          ['Computer Systems Analysts',    'Atlanta',            16280],
          ['Information Security Analysts',       'Atlanta',            3540],
          ['Computer and Information Research Scientists',    'Atlanta',            380],
          ['Computer Network Support Specialists',    'Atlanta',            5450],
          ['Computer User Support Specialists',    'Atlanta',            17150],
          ['Computer Network Architects',    'Atlanta',            4960],
          ['Network and Computer Systems Administrators',    'Atlanta',            7340],
          ['Database Administrators and Architects',    'Atlanta',            4160],
          ['Computer Programmers',    'Atlanta',            3600],
          ['Software Developers and Software Quality Assurance Analysts and Testers',    'Atlanta',            40400],
          ['Web Developers and Digital Interface Designers',    'Atlanta',            2720],
          ['Computer Occupations, All Other',    'Atlanta',            17180],
          ['Actuaries',    'Atlanta',            230],
          ['Operations Research Analysts',    'Atlanta',            3180],
          ['Statisticians',    'Atlanta',            550],
          ['Data Scientists and Mathematical Science Occupations, All Other',    'Atlanta',            920],
          
          // AUSTIN
          ['Computer Systems Analysts.',    'Austin',            9040],
          ['Information Security Analysts.',       'Austin',            1550],
          ['Computer and Information Research Scientists.',    'Austin',            290],
          ['Computer Network Support Specialists.',    'Austin',            2750],
          ['Computer User Support Specialists.',    'Austin',            8270],
          ['Computer Network Architects.',    'Austin',            2160],
          ['Network and Computer Systems Administrators.',    'Austin',            5580],
          ['Database Administrators and Architects.',    'Austin',            2060],
          ['Computer Programmers.',    'Austin',            3290],
          ['Software Developers and Software Quality Assurance Analysts and Testers.',    'Austin',            23410],
          ['Web Developers and Digital Interface Designers.',    'Austin',            2160],
          ['Computer Occupations, All Other.',    'Austin',            3950],
          ['Actuaries.',    'Austin',            340],
          ['Operations Research Analysts.',    'Austin',            1190],
          ['Statisticians.',    'Austin',            280],
          ['Data Scientists and Mathematical Science Occupations, All Other.',    'Austin',            370],
          
          // New York
          ['Computer Systems Analysts...',    'New York City',            44210],
          ['Information Security Analysts...',       'New York City',            8850],
          ['Computer and Information Research Scientists...',    'New York City',            1800],
          ['Computer Network Support Specialists...',    'New York City',            13450],
          ['Computer User Support Specialists...',    'New York City',            42840],
          ['Computer Network Architects...',    'New York City',            10120],
          ['Network and Computer Systems Administrators...',    'New York City',            27140],
          ['Database Administrators and Architects...',    'New York City',            8890],
          ['Computer Programmers...',    'New York City',            15070],
          ['Software Developers and Software Quality Assurance Analysts and Testers...',    'New York City',            100470],
          ['Web Developers and Digital Interface Designers...',    'New York City',            13460],
          ['Computer Occupations, All Other...',    'New York City',            12150],
          ['Actuaries...',    'New York City',            2350],
          ['Mathematicians.',    'New York City',            230],
          ['Operations Research Analysts...',    'New York City',            7370],
          ['Statisticians...',    'New York City',            1700],
          ['Data Scientists and Mathematical Science Occupations, All Other...',    'New York City',            2690],
          
          // SF
          ['Computer Systems Analysts .',    'San Francisco',            16980],
          ['Information Security Analysts .',       'San Francisco',            2260],
          ['Computer and Information Research Scientists .',    'San Francisco',            2580],
          ['Computer Network Support Specialists .',    'San Francisco',            3320],
          ['Computer User Support Specialists .',    'San Francisco',            16980],
          ['Computer Network Architects .',    'San Francisco',            4250],
          ['Network and Computer Systems Administrators .',    'San Francisco',            7070],
          ['Database Administrators and Architects .',    'San Francisco',            3660],
			  
          ['Computer Programmers .',    'San Francisco',            6120],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'San Francisco',            65790],
          ['Web Developers and Digital Interface Designers .',    'San Francisco',            6160],
          ['Computer Occupations, All Other .',    'San Francisco',            22250],
          ['Actuaries .',    'San Francisco',            440],
          ['Operations Research Analysts .',    'San Francisco',            2460],
          ['Statisticians .',    'San Francisco',            1770],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'San Francisco',            1410],
       
          //"Dallas, TX"
          ['Computer Systems Analysts .',    'Dallas',            19460],
          ['Information Security Analysts .',       'Dallas',            4690],
          ['Computer and Information Research Scientists .',    'Dallas',            740],
          ['Computer Network Support Specialists .',    'Dallas',            5300],
          ['Computer User Support Specialists .',    'Dallas',            23120],
          ['Computer Network Architects .',    'Dallas',            5690],
          ['Network and Computer Systems Administrators .',    'Dallas',            12610],
          ['Database Administrators and Architects .',    'Dallas',            4820],
        
          ['Computer Programmers .',    'Dallas',            9240],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Dallas',            51370],
          ['Web Developers and Digital Interface Designers .',    'Dallas',            3850],
          ['Computer Occupations, All Other .',    'Dallas',            11490],
          ['Actuaries .',    'Dallas',            390],
          ['Operations Research Analysts .',    'Dallas',            4370],
          ['Statisticians .',    'Dallas',            540],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Dallas',            790],
   
          //"Raleigh, NC"
          ['Computer Systems Analysts .',    'Raleigh',            7070],
          ['Information Security Analysts .',       'Raleigh',            1420],
          ['Computer Network Support Specialists .',    'Raleigh',            2070],
          ['Computer User Support Specialists .',    'Raleigh',            5370],
          ['Computer Network Architects .',    'Raleigh',            1410],
          ['Network and Computer Systems Administrators .',    'Raleigh',            2860],
          ['Database Administrators and Architects .',    'Raleigh',            800],
        
          ['Computer Programmers .',    'Raleigh',            1230],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Raleigh',            14600],
          ['Web Developers and Digital Interface Designers .',    'Raleigh',            1040],
          ['Computer Occupations, All Other .',    'Raleigh',            1170],
          ['Actuaries .',    'Raleigh',            40],
          ['Operations Research Analysts .',    'Raleigh',            480],
          ['Statisticians .',    'Raleigh',            490],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Raleigh',            460],

          //"San Jose, CA"
          ['Computer Systems Analysts .',    'San Jose',            12190],
          ['Information Security Analysts .',       'San Jose',            1330],
          ['Computer Network Support Specialists .',    'San Jose',            1660],
          ['Computer User Support Specialists .',    'San Jose',            2190],
          ['Computer Network Architects .',    'San Jose',            12850],
          ['Network and Computer Systems Administrators .',    'San Jose',            3330],
          ['Database Administrators and Architects .',    'San Jose',            1980],
        
          ['Computer Programmers .',    'San Jose',            3510],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'San Jose',            81950],
          ['Web Developers and Digital Interface Designers .',    'San Jose',            2550],
          ['Computer Occupations, All Other .',    'San Jose',            13180],
  
          ['Operations Research Analysts .',    'San Jose',            1040],
          ['Statisticians .',    'San Jose',            560],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'San Jose',            710],

          //"Charlotte, NC"
          ['Computer Systems Analysts .',    'Charlotte',            11310],
          ['Information Security Analysts .',       'Charlotte',            3070],
          ['Computer Network Support Specialists .',    'Charlotte',            1920],
          ['Computer User Support Specialists .',    'Charlotte',            6250],
          ['Computer Network Architects .',    'Charlotte',            1790],
          ['Network and Computer Systems Administrators .',    'Charlotte',            3890],
          ['Database Administrators and Architects .',    'Charlotte',            1510],
        
          ['Computer Programmers .',    'Charlotte',            1590],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Charlotte',            13370],
          ['Web Developers and Digital Interface Designers .',    'Charlotte',            1440],
          ['Computer Occupations, All Other .',    'Charlotte',            1770],
          ['Operations Research Analysts .',    'Charlotte',            1770],
          ['Statisticians .',    'Charlotte',            170],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Charlotte',            290],

          //"Seattle, WA"
          ['Computer Systems Analysts .',    'Seattle',            12590],
          ['Information Security Analysts .',       'Seattle',            2480],
          ['Computer Network Support Specialists .',    'Seattle',            1750],
          ['Computer User Support Specialists .',    'Seattle',            2610],
          ['Computer Network Architects .',    'Seattle',            13130],
          ['Network and Computer Systems Administrators .',    'Seattle',            3030],
          ['Database Administrators and Architects .',    'Seattle',            5940],
        
          ['Computer Programmers .',    'Seattle',            2230],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Seattle',            71940],
          ['Web Developers and Digital Interface Designers .',    'Seattle',            12510],
          ['Actuaries .',    'Seattle',            380],
          ['Operations Research Analysts .',    'Seattle',            2180],
          ['Statisticians .',    'Seattle',            1080],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Seattle',            1050],

          //"Huntsville, Al"
          ['Computer Systems Analysts .',    'Huntsville',            1600],
          ['Information Security Analysts .',       'Huntsville',            710],
          ['Computer Network Support Specialists .',    'Huntsville',            410],
          ['Computer User Support Specialists .',    'Huntsville',            290],
          ['Computer Network Architects .',    'Huntsville',            1120],
          ['Network and Computer Systems Administrators .',    'Huntsville',            530],
          ['Database Administrators and Architects .',    'Huntsville',            780],
        
          ['Computer Programmers .',    'Huntsville',            390],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Huntsville',            2400],
          ['Web Developers and Digital Interface Designers .',    'Huntsville',            6610],
          ['Computer Occupations, All Other .',    'Huntsville',            210],
          ['Operations Research Analysts .',    'Huntsville',            460],

          //"Denver, CO"
          ['Computer Systems Analysts .',    'Denver',            6710],
          ['Information Security Analysts .',       'Denver',            2440],
          ['Computer Network Support Specialists .',    'Denver',            3130],
          ['Computer User Support Specialists .',    'Denver',            9250],
          ['Computer Network Architects .',    'Denver',            5040],
          ['Network and Computer Systems Administrators .',    'Denver',            8320],
          ['Database Administrators and Architects .',    'Denver',            1230],
        
          ['Computer Programmers .',    'Denver',            1740],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Denver',            28740],
          ['Web Developers and Digital Interface Designers .',    'San Jose',            2070],
          ['Computer Occupations, All Other .',    'Denver',            9260],
          ['Actuaries .',    'Denver',            210],
          ['Operations Research Analysts .',    'Denver',            490],
          ['Statisticians .',    'Denver',            810],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Denver',            490],

         
          //"Boston, MA"
          ['Computer Systems Analysts .',    'Boston',            15430],
          ['Information Security Analysts .',       'Boston',            4010],
          ['Computer Network Support Specialists .',    'Boston',            4300],
          ['Computer User Support Specialists .',    'Boston',            17040],
          ['Computer Network Architects .',    'Boston',            5440],
          ['Network and Computer Systems Administrators .',    'Boston',            7710],
          ['Database Administrators and Architects .',    'Boston',            3120],
        
          ['Computer Programmers .',    'Boston',            4150],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Boston',            55260],
          ['Web Developers and Digital Interface Designers .',    'Boston',            4270],
          ['Actuaries .',    'Boston',            960],
          ['Operations Research Analysts .',    'Boston',            2330],
          ['Statisticians .',    'Boston',            2670],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Boston',            520],

          //"Trenton, NJ"
          ['Computer Systems Analysts .',    'Trenton',            1390],
          ['Information Security Analysts .',       'Trenton',            210],
          ['Computer Network Support Specialists .',    'Trenton',            40],
          ['Computer User Support Specialists .',    'Trenton',            1260],
          ['Computer Network Architects .',    'Trenton',            270],
          ['Network and Computer Systems Administrators .',    'Trenton',            1000],
          ['Database Administrators and Architects .',    'Trenton',            360],
        
          ['Computer Programmers .',    'Trenton',            660],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'Trenton',            4140],
          ['Web Developers and Digital Interface Designers .',    'Trenton',            270],
          ['Computer Occupations, All Other .',    'Trenton',            530],
          ['Actuaries .',    'Trenton',            50],
          ['Operations Research Analysts .',    'Trenton',            200],
          ['Statisticians .',    'Trenton',            300],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'Trenton',            120],

          
 
        ]);

        tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

        var options = {
          minColor: '#076794',
          midColor: '#ddd',
          maxColor: '#e8fbfe',
          headerHeight: 15,
          fontColor: 'black',
          fontFamily:"Arial",
          fontSize: 15,
          showScale: true,
          generateTooltip: showFullTooltip
        };
					
        tree.draw(data, options);
        
        function showFullTooltip(row, size, value) {
          return '<div style="background:#e6f3f6; padding:13px; border-style:none">' +
                 '<span style="font-family:"Arial";"><b>' + data.getValue(row, 0) +
                 '</b></span><br>' + '<span style="font-family:"Arial";">' + data.getColumnLabel(2) + " : "  + size + '<br>' + ' </div>';
        }
     };

