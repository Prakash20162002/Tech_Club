$(document).ready(function () {
    // Handle category change
    $('#category').change(function () {
        if ($(this).val() === 'student') {
            $('#student-type-group').show();
        } else {
            $('#student-type-group').hide();
        }
    });

    // Generate user information on button click
    $('#generate').click(function () {
        generateUsers(); // Call the generate function defined below
    });

    // Event listeners for button functionalities
    document.getElementById("download").addEventListener("click", downloadCSV);
    document.getElementById("generate-qr").addEventListener("click", generateQRCodeForCSV);
    document.getElementById("clear").addEventListener("click", clearUserInfo);

    let users = []; // To store user data

    // Predefined lists for names, addresses, and nationalities
    const names = {
        student: {
            school: [
                "Rahul Sharma", "Priya Singh", "Amit Verma", "Neha Gupta", "Suresh Kumar",
                "Pooja Patel", "Anil Mehta", "Sneha Reddy", "Vikas Chawla", "Ritika Joshi"
            ],
            college: [
                "Ankit Bansal", "Deepika Sharma", "Nikhil Singh", "Priyanka Reddy", "Karan Kumar",
                "Aisha Patel", "Rajesh Mehta", "Suman Roy", "Vivek Gupta", "Sonali Yadav"
            ]
        },
        passport: [
            "John Doe", "Jane Smith", "Carlos Garcia", "Ling Wong", "Fatima Khan"
        ],
        organization: [
            "Robert Brown", "Angela White", "Chen Li", "Mikhail Ivanov", "Maria Fernandez"
        ]
    };

    // Separate addresses for each category
    const addresses = {
        student: [
            "101 MG Road",
            "5-89 Lajpat Nagar",
            "45 Park Street"
        ],
        passport: [
            "123 Elm St, Springfield",
            "456 Maple Ave, Toronto",
            "789 Pine Rd, Sydney, NSW"
        ],
        organization: [
            "1001 Corporate Blvd, ",
            "2002 Business Park",
            "3003 Industrial Way"
        ]

    };

    // Define nationality options based on category
    const nationalityOptions = {
        student: ["Indian"],
        passport: ["India", "Bangladesh", "USA", "Canada"],
        organization: ["Bangalore", "Chennai", "Hyderabad", "Noida", "Coimbatore"]
    };

    // Function to generate multiple users based on the selected category
    function generateUsers() {
        const category = $('#category').val(); // Get selected category
        const userCount = parseInt($('#user-count').val()) || 1; // Get user count

        users = []; // Reset users array before generating new users

        for (let i = 0; i < userCount; i++) {
            const studentType = category === 'student' ? $('#student-type').val() : null; // Get student type if category is student
            const user = generateUser(category, studentType); // Call generateUser function

            users.push(user); // Add generated user to the users array
            displayUser(user); // Display the generated user
        }
    }

    // Modify the generateUser function to return an object for easy access
    function generateUser(category, studentType) {
        let name, age, phone, address, nationality, status;

        if (category === 'student') {
            name = names[category][studentType][Math.floor(Math.random() * names[category][studentType].length)];

            // Age logic based on student type
            if (studentType === 'school') {
                age = Math.floor(Math.random() * 14) + 5; // Age between 5 and 18
                status = 'Status: School Student';
            } else {
                age = Math.floor(Math.random() * 13) + 18; // Age between 18 and 30
                status = 'Status: College Student';
            }
        } else {
            name = names[category][Math.floor(Math.random() * names[category].length)];
            age = Math.floor(Math.random() * 30) + 18; // Default age for other categories, between 18 and 47
            status = ''; // No status for non-student categories
        }

        phone = generatePhoneNumber(category);
        address = addresses[category][Math.floor(Math.random() * addresses[category].length)];
        nationality = getRandomNationality(category);

        return { name, age, phone, address, nationality, status }; // Return user data as an object
    }

    function displayUser(user) {
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML +=
            `<p>Name: ${user.name}</p>
        <p>Age: ${user.age}</p>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address}</p>
        <p>Nationality: ${user.nationality}</p>
        <p>${user.status || ''}</p>
        <hr />`;
    }


    function downloadCSV() {
        if (users.length === 0) {
            alert("No user information available to download.");
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8," +
            "Name,Age,Phone,Address,Nationality\n" +
            users.map(user => `${user.name},${user.age},${user.phone},${user.address},${user.nationality}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "user_info.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function generateQRCodeForCSV() {
        if (users.length === 0) {
            alert("Please generate user information first.");
            return; // Exit if no users are present
        }

        // Generate CSV content
        const csvContent = "Name,Age,Phone,Address,Nationality\n" +
            users.map(user => `${user.name},${user.age},${user.phone},${user.address},${user.nationality}`).join("\n");

        // Create a Blob object for the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        // Clear previous QR code
        const qrCodeContainer = document.getElementById("qr-code");
        qrCodeContainer.innerHTML = ""; // Clear previous QR code

        // Generate QR code
        const qrcode = new QRCode(qrCodeContainer, {
            text: url, // Use the Blob URL instead of the data URI
            width: 128,
            height: 128,
        });

        // Optionally, revoke the object URL after a certain timeout
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 10000); // Revoke after 10 seconds
    }

    // Function to get random nationality based on category
    function getRandomNationality(category) {
        const nationalities = nationalityOptions[category];
        return nationalities[Math.floor(Math.random() * nationalities.length)];
    }

    // Function to generate random phone number based on category
    function generatePhoneNumber(category) {
        switch (category) {
            case 'student':
                return generateIndianPhoneNumber(); // Indian phone number for students
            case 'passport':
                return generateUSAPhoneNumber(); // USA phone number for passport holders
            case 'organization':
                return generateAustralianPhoneNumber(); // Australian phone number for organizations
            default:
                return ''; // Return empty if category is not recognized
        }
    }

    // Function to generate random Indian phone number in the format +91 XXXXXXXXXX (10 digits local)
    function generateIndianPhoneNumber() {
        const firstDigit = Math.floor(Math.random() * 3) + 7; // Indian numbers start with 7, 8, or 9
        const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
        return `+91 ${firstDigit}${remainingDigits}`;
    }

    // Function to generate random USA phone number in the format +1 (XXX) XXX-XXXX
    function generateUSAPhoneNumber() {
        const areaCode = Math.floor(Math.random() * 900) + 100; // Area code between 100-999
        const exchangeCode = Math.floor(Math.random() * 900) + 100; // Exchange code between 100-999
        const lineNumber = Math.floor(Math.random() * 9000) + 1000; // Line number between 1000-9999
        return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    }

    // Function to generate random Australian phone number in the format +61 (0X) XXXX XXXX
    function generateAustralianPhoneNumber() {
        const areaCode = Math.floor(Math.random() * 10); // Australian area code
        const remaining = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
        return `+61 (0${areaCode}) ${remaining.substring(0, 4)} ${remaining.substring(4)}`;
    }

    // Function to clear user information
    function clearUserInfo() {
        users = []; // Clear users array
        document.getElementById("user-info").innerHTML = ""; // Clear displayed user info
    }
});