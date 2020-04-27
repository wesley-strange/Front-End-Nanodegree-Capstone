# Project: Capstone - Travel Website
The goal of this project was to put all of our skills to the test to create a travel website that allows users to add / remove upcoming trips to the website. The application uses 3 APIs to gather the weather and image information that is presented on the screen. 


## Format of the Landing Page

The landing page consists of a header, form, trip grid, and a footer message.


## Header

The header contains the website name.


## Form

The form is used to gather very basic information about the users upcoming travel plans (destination and start date).


## API Calls

The information submitted in the form is then used to pull informatino from the GeoNames, Weatherbit, and Pixabay APIs. 

- GeoNames: returns the latitude and longitude of the destination
- Weatherbit: returns the current or forecasted weather of the destination
- Pixabay: returns a photo of the destination


## Footer

Message to tell the user to never stop exploring, but you can put whatever you want here.


## Jest Testing

Built in some very minimal tests. This needs to be expanded on in future iterations to test the whole functionality. For example, I'm just testing that the functions are defined, since I don't know how to write better tests.


## Sass

Using Sass for styling vs css.


## Future enhancements

- Build in more form validation for Destination... 
- Write more tests to test the full functionality of the website.