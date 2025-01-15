/***************************
 *    ELEMENT REFERENCES
 ***************************/
let SortA_B = document.getElementById("SortA_B");
let SortZ_A = document.getElementById("SortZ_A");
let SortMarks = document.getElementById("SortMarks");
let SortPassing = document.getElementById("SortPassing");
let SortClass = document.getElementById("SortClass");
let SortGender = document.getElementById("SortGender");

let Button = document.getElementById("Button");
let SearchInput = document.getElementById("searchInput");

let Tbody = document.getElementById("tbody");

/***************************
 *    GLOBAL DATA ARRAY
 ***************************/
let studentData = [];

/***************************
 *    RENDER FUNCTION
 ***************************/
function renderTable(data) {
  // Clear existing rows
  Tbody.innerHTML = "";

  // Create and append rows
  data.forEach((item) => {
    let TR = document.createElement("tr");

    // ID
    let TD_Id = document.createElement("td");
    TD_Id.textContent = item.id;

    // Name (with Image) - (no duplication!)
    let TD_Name = document.createElement("td");
    let imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.style.width = "40px";
    imageElement.style.marginRight = "10px";
    let nameText = document.createTextNode(
      `${item.first_name} ${item.last_name}`
    );
    TD_Name.appendChild(imageElement);
    TD_Name.appendChild(nameText);

    // Gender
    let TD_gender = document.createElement("td");
    TD_gender.textContent = item.gender;

    // Class
    let TD_class = document.createElement("td");
    TD_class.textContent = item.class;

    // Marks
    let TD_marks = document.createElement("td");
    TD_marks.textContent = item.marks;

    // Passing
    let TD_passing = document.createElement("td");
    TD_passing.textContent = item.passing ? "Yes" : "No";

    // Email
    let TD_Email = document.createElement("td");
    TD_Email.textContent = item.email;

    // Append cells to the row
    TR.appendChild(TD_Id);
    TR.appendChild(TD_Name);
    TR.appendChild(TD_gender);
    TR.appendChild(TD_class);
    TR.appendChild(TD_marks);
    TR.appendChild(TD_passing);
    TR.appendChild(TD_Email);

    // Append the row to the table body
    Tbody.appendChild(TR);
  });
}

/***************************
 *   FETCH STUDENT DATA
 ***************************/
async function fetchStudentData() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
    );

    if (!response.ok) {
      throw new Error("Error fetching the data");
    }

    studentData = await response.json();
    renderTable(studentData);
    console.log("Data fetched:", studentData);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/***************************
 *   SORT BUTTONS
 ***************************/

// Sort A-B (by full name ascending)
SortA_B.addEventListener("click", () => {
  studentData.sort((a, b) => {
    let nameA = (a.first_name + " " + a.last_name).toLowerCase();
    let nameB = (b.first_name + " " + b.last_name).toLowerCase();
    return nameA.localeCompare(nameB);
  });
  renderTable(studentData);
});

// Sort Z-A (by full name descending)
SortZ_A.addEventListener("click", () => {
  studentData.sort((a, b) => {
    let nameA = (a.first_name + " " + a.last_name).toLowerCase();
    let nameB = (b.first_name + " " + b.last_name).toLowerCase();
    return nameB.localeCompare(nameA);
  });
  renderTable(studentData);
});

// Sort Marks (ascending)
SortMarks.addEventListener("click", () => {
  studentData.sort((a, b) => a.marks - b.marks);
  renderTable(studentData);
});

// Sort Passing (Yes first, No next)
SortPassing.addEventListener("click", () => {
  studentData.sort((a, b) => Number(b.passing) - Number(a.passing));
  renderTable(studentData);
});

// Sort Class (ascending)
SortClass.addEventListener("click", () => {
  studentData.sort((a, b) => a.class - b.class);
  renderTable(studentData);
});

// Sort Gender (alphabetically - e.g. F, M)
SortGender.addEventListener("click", () => {
  studentData.sort((a, b) => a.gender.localeCompare(b.gender));
  renderTable(studentData);
});

/***************************
 *   SEARCH FUNCTIONALITY
 ***************************/
Button.addEventListener("click", () => {
  let query = SearchInput.value.trim().toLowerCase();

  // If the search box is empty, show all data
  if (!query) {
    renderTable(studentData);
    return;
  }

  // Filter by multiple fields
  let filteredData = studentData.filter((item) => {
    let fullName = (item.first_name + " " + item.last_name).toLowerCase();
    let email = item.email.toLowerCase();
    let gender = item.gender.toLowerCase();
    let className = String(item.class); 
    let passing = item.passing ? "yes" : "no";

    return (
      fullName.includes(query) ||
      email.includes(query) ||
      gender.includes(query) ||
      className.includes(query) ||
      passing.includes(query)
    );
  });

  renderTable(filteredData);
});

/***************************
 *   ON PAGE LOAD
 ***************************/
fetchStudentData();
