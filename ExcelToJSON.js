const fs = require('fs');

const reader = require('xlsx');

const jsonFileName = "./data/data.json";
const file = reader.readFile("./datasource/Comic Writer Services.xlsx");

let data = {
    authors: [],
    categories:[],
}

function createAuthor(fullname) {
    let names = fullname.trim().split(" ");
    let firstName = "";
    let lastName = "";

    if (names.length > 2) {
        for(i=0; i < names.length - 1; i++) {
            firstName = firstName + names[i].trim() + " ";
        }

        firstName = firstName.trim();
        lastName = names[names.length - 1];
    } else {
        firstName = names[0];
        lastName = names[1];
    }

    let fullName = fullname.trim();
    
    let obj = {
        fullname: fullName,
        firstname: firstName,
        lastname: lastName
    };

    return obj;
}

let tempAuthors = [];

tempAuthors.push(createAuthor("Not Known"));

const sheets = file.SheetNames;

for(let i = 0; i < sheets.length; i++) 
{ 
   const sheetName = file.SheetNames[i];
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

   let sheetData = {
      category: sheetName,
      links: []
   };
        
   temp.forEach((res) => {
    if (res.Ignore !== undefined) {
        if (res.Ignore.length > 0) {
            return;
        }
    }


      let linkData = {
         Title: "",
         Link: res.Link,
         Description: "",
         Authors: []
      };

      if (res.Title !== undefined) {
        linkData.Title = res.Title.trim();
     }

      if (res.Description !== undefined) {
         linkData.Description = res.Description.trim();
      }

      let authors = [];

      if (res.Authors !== undefined) {
         authors = res.Authors.split(";");
      }

      // ADD DEFAULT AUTHOR
      if (authors.length === 0) {
         authors.push("Not Known");
      }

      let tempLinkAuthors = [];

      // CHECK IF LIST OF AUTHORS ALREADY CONTAIN AUTHOR FOR THIS ARTICLE
      authors.forEach(author => {
        let tempAuthor = createAuthor(author);

        let found = tempAuthors.some(item => item.fullname === tempAuthor.fullname);

        // ADD AUTHOR TO GENERAL LIST OF AUTHORS
        if (found === false) {
            tempAuthors.push(tempAuthor);
        }

        // ADD AUTHOR TO ARTICLE LIST OF AUTHORS
        tempLinkAuthors.push(tempAuthor);
      });

      // ADD LIST OF AUTHORS TO ARTICLE
      linkData.Authors = tempLinkAuthors;
   
      // ADD NEW LINKS
      sheetData.links.push(linkData);
   })


   data.categories.push(sheetData);
}

// REMOVE "NOT KNOWN" BEFORE SORTING.
tempAuthors.splice(0, 1);

// SORT AUTHORS
tempAuthors.sort(function(a,b) {
    if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0; 
});

// RE-ADD "NOT KNOWN"
tempAuthors.unshift(createAuthor("Not Known"));

data.authors = tempAuthors;

let jsonStr = JSON.stringify(data);

fs.writeFile(jsonFileName, jsonStr, function (err) {
    if (err) return console.log(err);
    console.log('Completed Excel to JSON > data.json');
  });
