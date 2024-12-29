$(document).ready(function () {

    // الزينه

    function winning() {
        var duration = 15 * 1000; // مدة التأثير بالميلي ثانية (15 ثانية)
        var animationEnd = Date.now() + duration;

        function triggerConfetti() {
            confetti({
                particleCount: 100, // عدد الجزيئات
                angle: 90, // زاوية إطلاق الجزيئات
                spread: 70, // الانتشار
                origin: { x: 0.5, y: 0.5 }, // النقطة التي تنبعث منها الجزيئات
                colors: ['#ff5733', '#33c1ff', '#ffbc33'], // الألوان
            });
        }

        // بدء التأثير
        triggerConfetti();

        // إعادة التأثير عدة مرات حتى تنتهي المدة
        var interval = setInterval(function () {
            if (Date.now() < animationEnd) {
                triggerConfetti();
            } else {
                clearInterval(interval); // إيقاف التأثير بعد انتهاء الوقت
            }
        }, 500); // تكرار كل نصف ثانية
    }

    // #######

    var stopAngle;

    // الكود الذي سيشغل العجلة عند الضغط على الزر
    $(".spin-btn").click(function () {

        // التحقق من وجود session باسم log-sindbad بعد الضغط على الزر
        if (sessionStorage.getItem("log-sindbad")) {
            // إذا كانت session موجودة، ننفذ الكود الخاص بالتدوير
            $(this).attr("disabled", "disabled");
            let option = Math.floor(Math.random() * 2);
            if (option == 0) {
                stopAngle = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
            } else {
                stopAngle = Math.floor(Math.random() * (360 - 300 + 1)) + 300;
            }

            // تحديد عدد التدويرات العشوائية
            var spins = Math.floor(Math.random() * 5) + 3; // بين 3 و 7 لفات
            var degree = spins * 360 + stopAngle; // إضافة زاوية التوقف للمجموع الكلي

            // إضافة حركة التدوير للعجلة
            $(".wheel").animate(
                {
                    // تدوير العجلة بشكل حلزوني
                    deg: degree
                },
                {
                    // المدة الزمنية
                    duration: 5000, // 5 ثواني
                    step: function (now) {
                        // تدوير العجلة باستخدام الـ CSS3
                        $(this).css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    },
                    // بعد انتهاء التدوير يمكن إضافة أي تأثير آخر
                    complete: function () {
                        // هنا يمكن إضافة منطق للتحقق من الجوائز أو عرض النتيجة
                        if (option == 0) {
                            console.log("المكسب الاصفر");
                            winning()
                            setTimeout(function () {
                                $(".cobon").fadeIn(700)
                            }, 300)
                        } else {
                            console.log("المكسب الفيروزى");
                            winning()
                            setTimeout(function () {
                                $(".cobon").fadeIn(700)
                            }, 300)
                        }
                    }
                }
            );


        } else {
            // إذا لم توجد session، تظهر رسالة
            $(".form-container").fadeIn();
        }
    });

    // keyboard - dev tools
    document.addEventListener("keydown", function (e) {
        // منع فتح DevTools باستخدام F12 أو Ctrl+Shift+I أو Ctrl+Shift+J
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || (e.ctrlKey && e.key === "U")) {
            e.preventDefault();
        }
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    setInterval(function () {
        // تحقق من عرض الشاشة (إيقاف الكود للشاشات الصغيرة)
        if (window.innerWidth > 768) {
            if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
                document.body.innerHTML = ""; // مسح الصفحة
                alert("DevTools Detected! Please close it.");
            }
        }
    }, 500);

});


$(".next-btn").click(function () {
    // جلب القيم من الحقول
    const name = document.getElementById('name_inp').value.trim();
    const phone = document.getElementById('phone_inp').value.trim();
    const state = document.getElementById('state').value;

    // التحقق من القيم
    if (name === '') {
        $(".error").slideDown().html('من فضلك أدخل اسمك ')
        setTimeout(function () {
            $(".error").slideUp()
        }, 2000)
        return;
    } else if (phone === '') {
        $(".error").slideDown().html('من فضلك أدخل رقم تليفونك')
        setTimeout(function () {
            $(".error").slideUp()
        }, 2000)
        return;
    } else if (!/^(7|9|2)[0-9]{7}$/.test(phone)) { // التحقق من رقم الهاتف العماني
        $(".error").slideDown().html('من فضلك أدخل رقم تليفون عماني صحيح')
        setTimeout(function () {
            $(".error").slideUp()
        }, 2000)
        return;
    } else if (state === '0') {
        $(".error").slideDown().html('من فضلك اختر الولاية')
        setTimeout(function () {
            $(".error").slideUp()
        }, 2000)
        return;
    } else {
        // في حالة التحقق بنجاح
        $(".form-container form").addClass("first-done")
        setTimeout(function () {
            $(".quiz-1").css("transform", "translateX(-111.5%)")
        }, 300)
    }
});




