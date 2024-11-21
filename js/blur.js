const paramedicElements = document.querySelectorAll('.paramedic1-2, .paramedic1-6, .paramedic1-3, .paramedic1-4, .paramedic1-5 ,.paramedic2-1, .paramedic2-2, .paramedic2-3, .paramedic2-4');

paramedicElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // 모든 요소에 .blurred 클래스 추가
        paramedicElements.forEach(el => {
            el.classList.add('blurredper');
        });
        // 호버 중인 요소만 .blurred 클래스 제거
        element.classList.remove('blurredper');
    });

    element.addEventListener('mouseleave', () => {
        // 마우스가 떠나면 모든 요소에서 .blurred 클래스 제거
        paramedicElements.forEach(el => {
            el.classList.remove('blurredper');
        });
    });
});
//응급 구조사 블러 끝
const hospitalElements = document.querySelectorAll('.hospital1-2, .hospital1-3, .hospital2-1, .hospital2-2');

hospitalElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // 모든 요소에 .blurred 클래스 추가
        hospitalElements.forEach(el => {
            el.classList.add('blurredhosp');
        });
        // 호버 중인 요소만 .blurred 클래스 제거
        element.classList.remove('blurredhosp');
    });

    element.addEventListener('mouseleave', () => {
        // 마우스가 떠나면 모든 요소에서 .blurred 클래스 제거
        hospitalElements.forEach(el => {
            el.classList.remove('blurredhosp');
        });
    });
});
// 병원 블러처리 끝
const citizenElements = document.querySelectorAll('.citizen1-3, .citizen1-4, .citizen1-2');

citizenElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // 모든 요소에 .blurred 클래스 추가
        citizenElements.forEach(el => {
            el.classList.add('blurredcitizen');
        });
        // 호버 중인 요소만 .blurred 클래스 제거
        element.classList.remove('blurredcitizen');
    });

    element.addEventListener('mouseleave', () => {
        // 마우스가 떠나면 모든 요소에서 .blurred 클래스 제거
        citizenElements.forEach(el => {
            el.classList.remove('blurredcitizen');
        });
    });
});
//device 블러
const deviceElements = document.querySelectorAll('.device1 img, .device2 video, .device3 img, .device4 img');

deviceElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // 모든 요소에 .blurred 클래스 추가
        deviceElements.forEach(el => {
            el.classList.add('blurreddev');
        });
        // 호버 중인 요소만 .blurred 클래스 제거
        element.classList.remove('blurreddev');
    });

    element.addEventListener('mouseleave', () => {
        // 마우스가 떠나면 모든 요소에서 .blurred 클래스 제거
        deviceElements.forEach(el => {
            el.classList.remove('blurreddev');
        });
    });
});
//device 블러 끝
