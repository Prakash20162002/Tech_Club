$(document).ready(function () {
    // Handle category change
    $("#category").change(function () {
        const selectedCategory = $(this).val();

        // Toggle visibility for student, passport, and organization subcategories
        if (selectedCategory === "student") {
            $("#student-type-group").show();
            $("#passport-country-group").hide();
            $("#organization-company-group").hide();
        } else if (selectedCategory === "passport") {
            $("#student-type-group").hide();
            $("#passport-country-group").show();
            $("#organization-company-group").hide();
        } else if (selectedCategory === "organization") {
            $("#student-type-group").hide();
            $("#passport-country-group").hide();
            $("#organization-company-group").show();
        } else {
            $(
                "#student-type-group, #passport-country-group, #organization-company-group"
            ).hide();
        }
    });

    // Generate user information on button click
    $("#generate").click(function () {
        generateUsers(); // Call the generate function defined below
    });

    // Event listeners for button functionalities
    document.getElementById("download").addEventListener("click", downloadCSV);
    document
        .getElementById("generate-qr")
        .addEventListener("click", generateQRCodeForCSV);
    document.getElementById("clear").addEventListener("click", clearUserInfo);

    let users = []; // To store user data

    // Predefined lists for names, addresses, and nationalities
    const names = {
        student: {
            school: [
                "Rahul Sharma",
                "Priya Singh",
                "Amit Verma",
                "Neha Gupta",
                "Suresh Kumar",
                "Pooja Patel",
                "Anil Mehta",
                "Sneha Reddy",
                "Vikas Chawla",
                "Ritika Joshi",
            ],
            college: [
                "Ankit Bansal",
                "Deepika Sharma",
                "Nikhil Singh",
                "Priyanka Reddy",
                "Karan Kumar",
                "Aisha Patel",
                "Rajesh Mehta",
                "Suman Roy",
                "Vivek Gupta",
                "Sonali Yadav",
                "Prakash Halwai",
                "Anuska Dutta",
                "Surjo das",
                "Arkadip Mondal",
                "Diya Biswas",
                "SadAli",
                "Subhankar Ayush",
                "Arijit Biswas",
            ],
        },
        passport: {
            India: [
                "Amit Kumar",
                "Sunita Reddy",
                "Vijay Singh",
                "Pooja Mehta",
                "Rajiv Gupta",
            ],
            Bangladesh: [
                "Rahim Uddin",
                "Fatima Begum",
                "Kamal Hossain",
                "Razia Sultana",
                "Imran Ali",
            ],
            USA: [
                "John Doe",
                "Jane Smith",
                "Carlos Garcia",
                "Ling Wong",
                "Fatima Khan",
            ],
            Canada: [
                "Michael Brown",
                "Emily Davis",
                "Sophie Wilson",
                "Liam Johnson",
                "Olivia Martin",
            ],
            // Add more countries and names as needed
        },
        organization: [
            "Robert Brown",
            "Angela White",
            "Chen Li",
            "Mikhail Ivanov",
            "Maria Fernandez",
        ],
    };

    // Separate addresses for each category and country
    const addresses = {
        student: ["101 MG Road", "5-89 Lajpat Nagar", "45 Park Street"],
        passport: {
            India: [
                "123 MG Road, New Delhi",
                "456 Sector 17, Chandigarh",
                "789 Park Avenue, Mumbai",
            ],
            Bangladesh: [
                "123 Dhaka Road, Dhaka",
                "456 Chittagong Street, Chittagong",
                "789 Sylhet Avenue, Sylhet",
            ],
            USA: [
                "123 Elm St, Springfield",
                "456 Maple Ave, Toronto",
                "789 Pine Rd, Sydney, NSW",
            ],
            Canada: [
                "123 King St, Toronto",
                "456 Queen St, Vancouver",
                "789 Prince St, Montreal",
            ],
            // Add more countries and addresses as needed
        },
        organization: [
            "1001 Corporate Blvd, Bangalore",
            "2002 Business Park, Chennai",
            "3003 Industrial Way, Hyderabad",
        ],
    };

    // Define nationality options based on category
    const nationalityOptions = {
        student: ["Indian"],
        passport: ["India", "Bangladesh", "USA", "Canada"],
        organization: ["Bangalore", "Chennai", "Hyderabad", "Noida", "Coimbatore"],
    };

    // Function to generate multiple users based on the selected category
    function generateUsers() {
        const category = $("#category").val(); // Get selected category
        const userCount = parseInt($("#user-count").val()) || 1; // Get user count

        users = []; // Reset users array before generating new users

        for (let i = 0; i < userCount; i++) {
            const studentType =
                category === "student" ? $("#student-type").val() : null; // Get student type if category is student
            const passportCountry =
                category === "passport" ? $("#passport-country").val() : null; // Get passport country if category is passport
            const organizationType =
                category === "organization" ? $("#organization-company").val() : null;
            const user = generateUser(category, studentType, passportCountry); // Call generateUser function

            users.push(user); // Add generated user to the users array
            displayUser(user); // Display the generated user
        }
    }

    // Modify the generateUser function to return an object for easy access
    function generateUser(category, studentType, passportCountry) {
        let name, age, phone, address, nationality, status;

        if (category === "student") {
            name =
                names[category][studentType][
                Math.floor(Math.random() * names[category][studentType].length)
                ];

            // Age logic based on student type
            if (studentType === "school") {
                age = Math.floor(Math.random() * 14) + 5; // Age between 5 and 18
                status = "Status: School Student";
            } else {
                age = Math.floor(Math.random() * 13) + 18; // Age between 18 and 30
                status = "Status: College Student";
            }

            address =
                addresses[category][
                Math.floor(Math.random() * addresses[category].length)
                ];
            nationality = "Indian"; // Default nationality for students
        } else if (category === "passport") {
            nationality = passportCountry; // Get selected nationality

            if (nationality) {
                name =
                    names[category][nationality][
                    Math.floor(Math.random() * names[category][nationality].length)
                    ];
                address =
                    addresses[category][nationality][
                    Math.floor(Math.random() * addresses[category][nationality].length)
                    ];
                age = Math.floor(Math.random() * 30) + 18; // Default age between 18 and 47
                status = ""; // No status for passport category
            } else {
                // If no country selected, assign default values
                name = "N/A";
                address = "N/A";
                age = "N/A";
                nationality = "N/A";
                status = "";
            }
        } else if (category === "organization") {
            const organizationType = $("#organization-type").val();
            name =
                names[category][Math.floor(Math.random() * names[category].length)];
            age = Math.floor(Math.random() * 30) + 18; // Default age for organization, between 18 and 47
            address =
                addresses[category][
                Math.floor(Math.random() * addresses[category].length)
                ];
            nationality = getRandomNationality(category);
            status = `Status: ${organizationType}`;
        } else {
            // Default case if no category is selected
            name = "N/A";
            age = "N/A";
            phone = "N/A";
            address = "N/A";
            nationality = "N/A";
            status = "";
        }

        phone = generatePhoneNumber(category, nationality); // Pass nationality

        return { name, age, phone, address, nationality, status }; // Return user data as an object
    }

    function displayUser(user) {
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML += `<p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Nationality:</strong> ${user.nationality}</p>
            <p>${user.status || ""}</p>
            <hr />`;
    }

    function downloadCSV() {
        if (users.length === 0) {
            alert("No user information available to download.");
            return;
        }

        let csvContent =
            "data:text/csv;charset=utf-8," +
            "Name,Age,Phone,Address,Nationality\n" +
            users
                .map(
                    (user) =>
                        `${user.name},${user.age},${user.phone},${user.address},${user.nationality}`
                )
                .join("\n");

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
        const csvContent =
            "Name,Age,Phone,Address,Nationality\n" +
            users
                .map(
                    (user) =>
                        `${user.name},${user.age},${user.phone},${user.address},${user.nationality}`
                )
                .join("\n");

        // Create a Blob object for the CSV data
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        // Clear previous QR code
        const qrCodeContainer = document.getElementById("qr-code");
        qrCodeContainer.innerHTML = "<h2>QR Code:</h2>"; // Reset the header

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

    // Function to generate random phone number based on category and nationality
    function generatePhoneNumber(category, nationality) {
        if (category === "student" || nationality === "India") {
            return generateIndianPhoneNumber();
        } else if (nationality === "USA") {
            return generateUSAPhoneNumber();
        } else if (nationality === "Canada") {
            return generateCanadianPhoneNumber();
        } else if (nationality === "Bangladesh") {
            return generateBangladeshPhoneNumber();
        } else if (nationality === "Australia") {
            return generateAustralianPhoneNumber();
        } else {
            return "N/A"; // Default if nationality not handled
        }
    }

    // Function to generate random Indian phone number in the format +91 XXXXXXXXXX (10 digits local)
    function generateIndianPhoneNumber() {
        const firstDigit = Math.floor(Math.random() * 3) + 7; // Indian numbers start with 7, 8, or 9
        const remainingDigits = Array.from({ length: 9 }, () =>
            Math.floor(Math.random() * 10)
        ).join("");
        return `+91 ${firstDigit}${remainingDigits}`;
    }

    // Function to generate random USA phone number in the format +1 (XXX) XXX-XXXX
    function generateUSAPhoneNumber() {
        const areaCode = Math.floor(Math.random() * 900) + 100; // Area code between 100-999
        const exchangeCode = Math.floor(Math.random() * 900) + 100; // Exchange code between 100-999
        const lineNumber = Math.floor(Math.random() * 9000) + 1000; // Line number between 1000-9999
        return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    }

    // Function to generate random Canadian phone number in the format +1 (XXX) XXX-XXXX
    function generateCanadianPhoneNumber() {
        const areaCode = Math.floor(Math.random() * 900) + 100; // Area code between 100-999
        const exchangeCode = Math.floor(Math.random() * 900) + 100; // Exchange code between 100-999
        const lineNumber = Math.floor(Math.random() * 9000) + 1000; // Line number between 1000-9999
        return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    }

    // Function to generate random Bangladesh phone number in the format +880 1XXXX-XXXXXX
    function generateBangladeshPhoneNumber() {
        const prefix = "1" + Math.floor(Math.random() * 9) + 0; // Mobile prefixes start with 1
        const remainingDigits = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * 10)
        ).join("");
        return `+880 1${prefix}-${remainingDigits}`;
    }

    // Function to generate random Australian phone number in the format +61 X XXXX XXXX
    function generateAustralianPhoneNumber() {
        const firstDigit = Math.floor(Math.random() * 8) + 2; // Australian numbers start with 2-9
        const remainingDigits = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * 10)
        ).join("");
        return `+61 ${firstDigit} ${remainingDigits.slice(0, 4)} ${remainingDigits.slice(4)}`;
    }

    // Function to clear user information display
    function clearUserInfo() {
        users = []; // Clear users array
        document.getElementById("user-info").innerHTML =
            "<h2>Generated User Information:</h2>"; // Reset the display with header
        document.getElementById("qr-code").innerHTML = "<h2>QR Code:</h2>"; // Reset the QR code section
    }
});
