// Access Token = NULL
var accessT = '';
// Bucket ID = NULL
var bId = '';
// Creating angular app : viewApp
var app = angular.module('viewApp', []);
var shareId = '';
var shareData = '';
// Creating angular controller for getting Buckets using method getBucket
app.controller('viewCtrl', function ($scope, $http) {

    // Get Bucket List Method Done
    $scope.getBucket = function () {
        if (accessT)
            $http({
                method: "GET",
                url: "http://filtershots.com:8080/bucket",
                headers: {
                    accessToken: accessT
                },
            }).then(function mySucces(response) {
                $scope.buck = response.data;
            });
    };

    // Add Bucket List - Get ID Done
    $scope.getBucketId = function (Id) {
        bId = Id;
    };

    // Remove Bucket Item Method Done
    $scope.removeBucketItem = function (buckId, itemId) {
        var item = document.getElementById("item");
        var params = "bucketId=" + buckId + "&itemId=" + itemId;
        $.ajax({
            type: "DELETE",
            url: "http://filtershots.com:8080/item",
            data: params,
            headers: {
                'accessToken': accessT
            },
            success: function (data) {
                setTimeout(function () {
                    location.reload();
                }, 1000);
                Materialize.toast("Successfully removed Bucket", 5000, "red lighten-2 rounded");
            },
            error: function (json) {
                console.log("Bucket Delete Error: " + json);
            }
        });
    };


    // Remove Bucket Method Done
    $scope.removeBucket = function (buckId) {
        var item = document.getElementById("item");
        var params = "bucketId=" + buckId;
        $.ajax({
            type: "DELETE",
            url: "http://filtershots.com:8080/bucket",
            data: params,
            headers: {
                'accessToken': accessT
            },
            success: function (data) {
                setTimeout(function () {
                    location.reload();
                }, 1000);
                Materialize.toast("Successfully removed Bucket", 3000, "red lighten-2 rounded");
            },
            error: function (json) {
                console.log("Bucket Delete Error: " + json);
            }
        });
    };
});

// Edit Bucket Done
function editBucket() {
    var url = "http://filtershots.com:8080/bucket";
    var n = document.getElementById("editName");
    n = n.value;
    var params = "bucketId=" + bId + "&bucketName=" + n;
    if (n) {
        $.ajax({
            type: "PUT",
            url: url,
            data: params,
            headers: {
                'accessToken': accessT
            },
            success: function (data) {
                setTimeout(function () {
                    location.reload();
                }, 1000);
                console.log(data);
                Materialize.toast("Successfully Edited Bucket", 3000, "green lighten-2 rounded");
            }
        });
        setTimeout(function () {
            location.reload();
        }, 1000);
    } else
        Materialize.toast("Fields can't be empty", 5000, "red lighten-1 rounded");
}

// Adding Bucket Done
function addBucket() {
    var url = "http://filtershots.com:8080/bucket";
    var n = document.getElementById("name");
    n = n.value;
    //    var list = [];
    //    $("input[name='list[]']").each(function () {
    //        list.push($(this).val());
    //    });
    var params = "bucketName=" + n;
    if (n) {
        $.ajax({
            type: "POST",
            url: url,
            data: params,
            headers: {
                'accessToken': accessT
            }
        });
        setTimeout(function () {
            location.reload();
        }, 1000);
        Materialize.toast("Successfully Added", 3000, "green lighten-2 rounded");

    } else
        Materialize.toast("Fields can't be empty", 5000, "red lighten-1 rounded");
}

// Adding Bucket List Done
function addBucketList() {
    var c = document.getElementById("list");
    c = c.value;
    var url = "http://filtershots.com:8080/item";
    var params = "bucketId=" + bId + "&content=" + c;
    if (c && bId) {
        $.ajax({
            type: "POST",
            url: url,
            data: params,
            headers: {
                'accessToken': accessT
            },
            success: function (data) {
                setTimeout(function () {
                    location.reload();
                }, 1000);
                console.log(data);
                Materialize.toast("Successfully Added List", 3000, "green lighten-2 rounded");
            }
        });
    } else
        Materialize.toast("Some Problem with your entry", 5000, "red lighten-1 rounded");
}

// Get Cookies and Set access tokens
function initToken(data) {
    accessT = data;
    document.cookie = "accessToken?" + accessT;
}

// Google SignIn Call
function onSignIn(googleUser) {
    $('#gbtn').hide();
    var profile = googleUser.getBasicProfile();
    console.log('Name: ' + profile.getName());
    var id_token = googleUser.getAuthResponse().id_token;
    var token = "tokenId=" + id_token;
    var url = "http://filtershots.com:8080/googleLogin";
    $.post(url, token,
        function (data, status) {
            initToken(data.accessToken);
            $('#add,#signout').show();
            location.reload();
        });
}

// Google SignOut Trigger
function signOut() {
    document.cookie = "";
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    location.reload();
}

// On window load
(function ($) {
    $(function () {

        // Hide divs initially
        $('.innerView,#add,#signout').hide();
        // Initialize Materialize JS Contents
        $('.button-collapse').sideNav();
        $('.scrollspy').scrollSpy();
        $('.modal').modal();

        // Get Cookie
        var x = document.cookie;
        if (x.indexOf("accessToken?") >= 0) {
            accessT = x.substring(x.lastIndexOf('?') + 1);
            $('#gbtn').hide();
            $('.innerView,#add,#signout').show();
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $("#view").offset().top
                }, 2000);
            }, 1000);
            angular.element(document.getElementById('view')).scope().getBucket();
        }

        /*** Animate word ***/

        //set animation timing
        var animationDelay = 2500,
            //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
            //letters effect
            lettersDelay = 50,
            //type effect
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            //clip effect 
            revealDuration = 600,
            revealAnimationDelay = 1500;

        initHeadline();


        function initHeadline() {
            singleLetters($('.cd-headline.letters').find('b'));
            animateHeadline($('.cd-headline'));
        }

        function singleLetters($words) {
            $words.each(function () {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (i in letters) {
                    if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function () {
                var headline = $(this);

                if (headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function () {
                        headline.find('.cd-words-wrapper').addClass('is-loading')
                    }, barWaiting);
                } else if (headline.hasClass('clip')) {
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type')) {
                    //assign to .cd-words-wrapper the width of its longest word
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function () {
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                };

                //trigger animation
                setTimeout(function () {
                    hideWord(headline.find('.is-visible').eq(0))
                }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if ($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function () {
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function () {
                    showWord(nextWord, typeLettersDelay)
                }, typeAnimationDelay);

            } else if ($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    width: '2px'
                }, revealDuration, function () {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, barAnimationDelay);
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if ($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    'width': $word.width() + 10
                }, revealDuration, function () {
                    setTimeout(function () {
                        hideWord($word)
                    }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    hideLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else if ($bool) {
                setTimeout(function () {
                    hideWord(takeNext($word))
                }, animationDelay);
            }

            if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.cd-headline').hasClass('type')) {
                    setTimeout(function () {
                        $word.parents('.cd-words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function () {
                        hideWord($word)
                    }, animationDelay)
                }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }

        $('.button-collapse').sideNav({
            menuWidth: 240, // Default is 240
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });

        $('.parallax').parallax();

        var card = document.querySelectorAll('.card-work');
        var transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

        function addDashes(name) {
            return name.replace(/([A-Z])/g, function (str, m1) {
                return '-' + m1.toLowerCase();
            });
        }

        function getPopup(id) {
            return document.querySelector('.popup[data-popup="' + id + '"]');
        }

        function getDimensions(el) {
            return el.getBoundingClientRect();
        }

        function getDifference(card, popup) {
            var cardDimensions = getDimensions(card),
                popupDimensions = getDimensions(popup);

            return {
                height: popupDimensions.height / cardDimensions.height,
                width: popupDimensions.width / cardDimensions.width,
                left: popupDimensions.left - cardDimensions.left,
                top: popupDimensions.top - cardDimensions.top
            }
        }

        function transformCard(card, size) {
            return card.style[Modernizr.prefixed('transform')] = 'translate(' + size.left + 'px,' + size.top + 'px)' + ' scale(' + size.width + ',' + size.height + ')';
        }

        function hasClass(elem, cls) {
            var str = " " + elem.className + " ";
            var testCls = " " + cls + " ";
            return (str.indexOf(testCls) != -1);
        }

        function closest(e) {
            var el = e.target || e.srcElement;
            if (el = el.parentNode)
                do { //its an inverse loop
                    var cls = el.className;
                    if (cls) {
                        cls = cls.split(" ");
                        if (-1 !== cls.indexOf("card-work")) {
                            return el;
                            break;
                        }
                    }
                } while (el = el.parentNode);
        }

        function scaleCard(e) {
            var el = closest(e);
            var target = el,
                id = target.getAttribute('data-popup-id'),
                popup = getPopup(id);

            var size = getDifference(target, popup);

            target.style[Modernizr.prefixed('transitionDuration')] = '0.5s';
            target.style[Modernizr.prefixed('transitionTimingFunction')] = 'cubic-bezier(0.4, 0, 0.2, 1)';
            target.style[Modernizr.prefixed('transitionProperty')] = addDashes(Modernizr.prefixed('transform'));
            target.style['borderRadius'] = 0;

            transformCard(target, size);
            onAnimated(target, popup);
            onPopupClick(target, popup);
        }

        function onAnimated(card, popup) {
            card.addEventListener(transEndEventName, function transitionEnded() {
                card.style['opacity'] = 0;
                popup.style['visibility'] = 'visible';
                popup.style['zIndex'] = 9999;
                card.removeEventListener(transEndEventName, transitionEnded);
            });
        }

        function onPopupClick(card, popup) {
            popup.addEventListener('click', function toggleVisibility(e) {
                var size = getDifference(popup, card);

                card.style['opacity'] = 1;
                card.style['borderRadius'] = '6px';
                hidePopup(e);
                transformCard(card, size);
            }, false);
        }


        function hidePopup(e) {
            e.target.style['visibility'] = 'hidden';
            e.target.style['zIndex'] = 2;
        }

        // [].forEach.call(card, function(card) {
        // 	card.addEventListener('click', scaleCard, false);
        // });
    }); // end of document ready
})(jQuery); // end of jQuery name space

//// Search for parameters in url
//if (window.location.href.indexOf("view=") > -1) {
//    var url = $(location).attr("href");
//    shareId = url.substring(url.lastIndexOf('=') + 1);
//    shareView();
//}
//// share View
//function shareView() {
//    $.ajax({
//        type: "GET",
//        url: "http://filtershots.com:8080/shared/"+shareId,
//        headers: {
//            'accessToken': accessT
//        },
//        success: function (data) {
//            console.log(data);
//            modal.
//        }
//    });
//};
