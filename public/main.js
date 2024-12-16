function toggleText(index) {
    var dots = document.querySelectorAll(".dots")[index];
    var moreText = document.querySelectorAll(".more")[index];
    var btnText = document.querySelectorAll(".myBtn")[index];
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
  $(document).ready(function() {
    $(".myBtn").click(function() {
      var index = $(this).data("index");
      var dots = $(".dots").eq(index);
      var moreText = $(".more").eq(index);
      var btnText = $(this);
  
      if (dots.is(":visible")) {
        dots.hide();
        btnText.text("Read more");
        moreText.show();
      } else {
        dots.show();
        btnText.text("Read less");
        moreText.hide();
      }
    });
  });

  function backgroundchange() {
    const currentColor = document.body.style.backgroundColor;
    
    if (currentColor === "white") {
        document.body.style.backgroundColor = "black";
    } else {
        document.body.style.backgroundColor = "white";
    }
}
