$(function() {
// Register
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        var checked = $("input[name='role']:checked").val();
        if(checked === "band") {
        var newBand = {
            user: $("#userReg").val().trim(),
            pass: $("#passReg").val().trim(),
            confirm: $("#confirmReg").val().trim(),
            email: $("#emailReg").val().trim()
        };
        if(newBand.pass !== newBand.confirm) {
            alert("Your passwords do not match");
        } else if (!newBand.pass || !newBand.user || !newBand.confirm || !newBand.email) {
            alert("Please fill out every field");
        } else {
            $('form :input').val('');
            $.ajax("/bandReg", {
                type: "POST",
                data: newBand
            }).then(function() {
                console.log("finished callback");
            });
        }
    } else if (checked === "manager") {
        var newManager = {
            user: $("#userReg").val().trim(),
            pass: $("#passReg").val().trim(),
            confirm: $("#confirmReg").val().trim(),
            email: $("#emailReg").val().trim()
        };
        if(newManager.pass !== newManager.confirm) {
            alert("Your passwords do not match");
        } else if (!newManager.pass || !newManager.user || !newManager.confirm || !newManager.email) {
            alert("Please fill out every field");
        } else {
            $('form :input').val('');
            $.ajax("/managerReg", {
                type: "POST",
                data: newManager
            }).then(function() {
                console.log("finished callback");
            });
        }
    }
    });
//  Sign in
    $(".sign-form").on("submit", function(event) {
        event.preventDefault();
        var checked = $("input[name='roleSign']:checked").val();
        // if(checked === "band") {
            var bandSign = {
                user: $("#userSign").val().trim(),
                pass: $("#userPass").val().trim()
            };
            $('form :input').val('');
            $.ajax("/authBand", {
                type: "POST",
                data: bandSign
            }).then(function(response) {
                console.log(response.status);
                console.log(response.id);
                if(response.status === true) {
                    window.location.href="/band/" + response.id;
                } else {
                    alert("Wrong");
                }
                console.log("finished callback");
            });
        // } else if (checked ==="manager") {
        //     var managerSign = {
        //         user: $("#userSign").val().trim(),
        //         pass: $("#userPass").val().trim()
        //     };
        //     $('form :input').val('');
        //     $.ajax("/authManager", {
        //         type: "POST",
        //         data: managerSign
        //     }).then(function() {
        //         console.log("finished callback");
        //     });
        // }
    });
});