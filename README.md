<h1 align="center">Random User Data Generator & PDF Generator with QR Code</h1>

<p align="center">
    <b>Two useful web applications:</b> <br>
    1. <strong>Random User Data Generator:</strong> Generates random user information and stores it in a CSV file. <br>
    2. <strong>PDF Generator with QR Code:</strong> Converts user input into a PDF document that includes a QR code containing the provided information.
</p>

---

<h2>Features</h2>

<ul>
    <li><strong>Random User Data Generator</strong>:
        <ul>
            <li>Generates random names, emails, and addresses.</li>
            <li>Saves the generated data in a CSV file for future use.</li>
        </ul>
    </li>
    <li><strong>PDF Generator with QR Code</strong>:
        <ul>
            <li>Converts any input text into a PDF.</li>
            <li>Embeds a QR code in the PDF that displays the provided text.</li>
        </ul>
    </li>
</ul>

---

<h2>Tech Stack</h2>

<table>
    <thead>
        <tr>
            <th>Category</th>
            <th>Technology</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Backend</strong></td>
            <td>Node.js, Express</td>
        </tr>
        <tr>
            <td><strong>Frontend</strong></td>
            <td>HTML, CSS, JavaScript</td>
        </tr>
        <tr>
            <td><strong>Libraries</strong></td>
            <td>
                <ul>
                    <li>For CSV handling: <code>csv-writer</code></li>
                    <li>For PDF generation: <code>pdf-lib</code></li>
                    <li>For QR code generation: <code>qrcode</code></li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

---

<h2>Installation</h2>

<ol>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/yourusername/your-repo-name.git</code></pre>
    
    <li>Navigate to the project folder:</li>
    <pre><code>cd your-repo-name</code></pre>
    
    <li>Install the dependencies for both applications:</li>
    <pre><code>npm install</code></pre>
</ol>

---

<h2>Running the Applications</h2>

<h3>To run the <strong>Random User Data Generator</strong>:</h3>
<pre><code>cd random-user-data-generator<br>node app.js</code></pre>

<h3>To run the <strong>PDF Generator with QR Code</strong>:</h3>
<pre><code>cd pdf-qr-generator<br>node app.js</code></pre>

---

<h2>Usage</h2>

<h3><strong>Random User Data Generator</strong></h3>
<ol>
    <li>Open the app in your browser at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</li>
    <li>Click on "Generate Data" to create random user data.</li>
    <li>The data will be saved in a <code>data.csv</code> file in the root directory.</li>
</ol>

<h3><strong>PDF Generator with QR Code</strong></h3>
<ol>
    <li>Open the app in your browser at <a href="http://localhost:3001" target="_blank">http://localhost:3001</a>.</li>
    <li>Input the information you want to encode in the QR code.</li>
    <li>Download the generated PDF, which will contain the QR code with the input data.</li>
</ol>

---

<h2>License</h2>

<p>This project is licensed under the <a href="https://prakash-tech-com.onrender.com/" target="_blank">Prakash_Tech</a>.</p>
