$(() => {
//Declaring variables for mobile view hamburger
const $menuButton = $('.hamburger');
const $mobileMenu = $('.mobile-nav');
//click function to add css class is active which is the menu slide in
$menuButton.on('click', () => {
  $menuButton.toggleClass('is-active');
  $mobileMenu.toggleClass('is-active');
})

const headerColor = () => {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('.navbar').addClass('active');
    }else {
      $('.navbar').removeClass('active');
    }
  })
}
headerColor();



})
