/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const totSections = 8;
const sections = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/*
* Adding section object to global data structure
*/
function addSectionToDataStructure(pSectionNum, pSectionName, pSectionDataNav, pSectionContentHeader, pSectionContentParagraph1, pSectionContentParagraph2){
    const sectionObj = {
        sectionNum : pSectionNum,
        sectionName : pSectionName,
        sectionDataNav : pSectionDataNav,
        sectionContentHeader : pSectionContentHeader,
        sectionContentParagraph1 : pSectionContentParagraph1,
        sectionContentParagraph2 : pSectionContentParagraph2
    };

    sections.push(sectionObj);
}

/*
    Init section struct adding sample content
*/
function initStruct(){
    for (let i=4; i < totSections; i++){
        addSectionToDataStructure( (i + 1), 
                                  'section', 
                                  'Section ' + (i + 1),
                                  'Section ' + (i + 1),
                                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.',
                                  'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.');
    }
}

/*
    Sample html section :
    <section id="section4" data-nav="Section 4">
      <div class="landing__container">
        <h2>Section 4</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
      </div>
    </section>


    Read from global struct and add content to document body
 */
function addSectionsToMain(){

    sections.forEach((objSection, index) => {

        // section element
        sectionElement = document.createElement('section');
        sectionElement.setAttribute('id',objSection.sectionName + objSection.sectionNum);
        sectionElement.setAttribute('data-nav',objSection.sectionDataNav);
        
        // first element is active 
        if (index == 0){
            sectionElement.classList.add('your-active-class');
        }

        // setting div element 
        let divElement = document.createElement('div');
        divElement.classList.add('landing__container');
        
        // h2 child div
        let h2Element = document.createElement('h2');
        h2Element.innerText = objSection.sectionContentHeader;
        divElement.appendChild(h2Element);

        // p child div
        let pElement1 = document.createElement('p');
        pElement1.innerText = objSection.sectionContentParagraph1;
        divElement.appendChild(pElement1);
        let pElement2 = document.createElement('p');
        pElement2.innerText = objSection.sectionContentParagraph2;
        divElement.appendChild(pElement2);

        sectionElement.appendChild(divElement);

        document.querySelector('main').appendChild(sectionElement);
    });

}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function buildTheNav(){
    sections.forEach( (element) => {
        let navBar = document.getElementById("navbar__list");
        let liElement = document.createElement('li');
        liElement.setAttribute('id','listItem' + element.sectionNum);
        liElement.setAttribute('data-section', element.sectionDataNav);
        liElement.classList.add('menu__link');
        liElement.innerHTML = `<a href="#${element.sectionName}${element.sectionNum}">${element.sectionDataNav}</a>`;
        navBar.appendChild(liElement);
    });
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    console.log('scrollToSection called');
    event.preventDefault(); // Prevent the default link behavior

    const targetId = this.getAttribute('href'); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Find the target section

    // Scroll smoothly to the target section
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', function(){
    
    console.log('the DOM is ready to be interacted with!');
    
    initStruct();

    // Build menu 
    buildTheNav();

    // Add sections to main element
    addSectionsToMain();

    // Scroll to section on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Set sections as active

});



/**
 * End Events
 * 
*/
