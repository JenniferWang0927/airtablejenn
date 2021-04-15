// console.log("Hello, Airtable");
// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
// console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
// connect our airtable base to our website using api key
var base = new Airtable({ apiKey: "keyEK6kGdjhMyfXSV" }).base(
  "appHxKhfSB19Ljk2R"
);

// get our airtable data specify how to retrieve it
base("image_collection")
  .select({})
  .eachPage(gotPageOfImage_Collection, gotAllImage);

// an empty array to hold our data
var images = [];

// callback function that receives our data
function gotPageOfImage_Collection(records, fetchNextPage) {
  console.log("gotPageOfBImage()");
  // add the records from this page to our images array
  images.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllImage(err) {
  console.log("gotAllImage()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogImage();
  showImage();
}

// just loop through tairtable data and console.log them
function consoleLogImage() {
  console.log("consoleLogColor_names()");
  images.forEach((collection) => {
    console.log("collection", collection.fields);
  });
}

function showImage() {
  console.log("showColorImage()");

  images.forEach((collection) => {
    var collectionGenre = collection.fields.genre.join('').replace("-", '').toLowerCase();

    var collectionContainer = document.querySelector(".js-" + collectionGenre);
    collectionContainer.classList.add("collection-container")
    // document.querySelector(".container").append(collectionContainer);

    var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    collectionContainer.append(imageContainer);

    var imageInnerContainer = document.createElement("div");
    imageInnerContainer.classList.add("image-inner-container");
    imageContainer.append(imageInnerContainer);

    var collectionImage = document.createElement("img");
    collectionImage.classList.add("image");
    collectionImage.src = collection.fields.image[0]['url'];
    collectionImage.style.width = "300px";
    collectionImage.style.height = "300px";

    var colorTitles = document.createElement("h1");
    colorTitles.classList.add("color-name");
    colorTitles.innerText = collection.fields.color_names;
    colorTitles.style.color = "white";

    var description = document.createElement("p");
    description.classList.add("image-description")
    description.style.width = "300px";
    description.style.color = "white";
    description.innerHTML = collection.fields.description;

    collectionImage.addEventListener('mouseenter', function(event) {
      imageInnerContainer.append(colorTitles);
      imageInnerContainer.append(description);
    });

    collectionImage.addEventListener('mouseleave', function(event) {
      imageInnerContainer.removeChild(colorTitles);
      imageInnerContainer.removeChild(description);
    });
    
    imageInnerContainer.append(collectionImage);

    // add event listener to add active class to song container
    collectionContainer.addEventListener("click", function (event) {
      imageContainer.classList.toggle("active");
      collectionImage.classList.toggle("active");
      colorTitles.classList.toggle("active");
      description.classList.toggle("active");
    });

    var filterChildhood = document.querySelector(".js-yellow");
    filterChildhood.addEventListener("click", function() {
      if (collectionContainer.classList.contains("yellow")) {
        collectionContainer.style.border = "yellow";
      } else {
        collectionContainer.style.border = "";
      }
    });

    var filterTeenage = document.querySelector(".js-white");
    filterTeenage.addEventListener("click", function() {
      if (collectionContainer.classList.contains("white")) {
        collectionContainer.style.border = "white";
      } else {
        collectionContainer.style.border = "";
      }
    });

    var filterHighSchool = document.querySelector(".js-deeprose");
    filterHighSchool.addEventListener("click", function() {
      if (collectionContainer.classList.contains("deeprose")) {
        collectionContainer.style.border = "deeprose";
      } else {
        collectionContainer.style.border = "";
      }
    });

    var filterCollege = document.querySelector(".js-redblack");
    filterCollege.addEventListener("click", function() {
      if (collectionContainer.classList.contains("redblack")) {
        collectionContainer.style.border = "redblack";
      } else {
        collectionContainer.style.border = "";
      }
    });

    var filterRecent = document.querySelector(".js-blue");
    filterRecent.addEventListener("click", function() {
      if (collectionContainer.classList.contains("blue")) {
        collectionContainer.style.border = "blue";
      } else {
        collectionContainer.style.border = "";
      }
    });

  });
}
