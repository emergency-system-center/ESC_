const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
let isMouseDown = false;
let startY;
let scrollTop;
let autoScrollInterval;
let currentPosition = 0;

// 슬라이더 아이템 복사 및 설정
function setupInfiniteSlider() {
    const items = Array.from(slider.children);
    const itemCount = items.length;

    // 앞뒤로 아이템 복사
    for (let i = 0; i < itemCount; i++) {
        const cloneStart = items[i].cloneNode(true);
        const cloneEnd = items[i].cloneNode(true);
        slider.insertBefore(cloneStart, items[0]);
        slider.appendChild(cloneEnd);
    }

    // 초기 위치 설정
    updateSliderPosition();
}

function updateSliderPosition() {
    const itemHeight = 110; // item height + gap
    slider.style.transform = `translateY(${currentPosition}px)`;

    // 슬라이더 위치 재설정
    const totalItems = slider.children.length;
    const originalItems = totalItems / 3;
    const totalHeight = originalItems * itemHeight;

    if (Math.abs(currentPosition) >= totalHeight * 2) {
        currentPosition = -totalHeight;
        slider.style.transition = 'none';
        slider.style.transform = `translateY(${currentPosition}px)`;
        // Force reflow
        slider.offsetHeight;
        slider.style.transition = 'transform 0.3s ease';
    } else if (currentPosition > 0) {
        currentPosition = -totalHeight;
        slider.style.transition = 'none';
        slider.style.transform = `translateY(${currentPosition}px)`;
        slider.offsetHeight;
        slider.style.transition = 'transform 0.3s ease';
    }
}

// 자동 스크롤 시작
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        if (!isMouseDown) {
            currentPosition -= 1;
            updateSliderPosition();
        }
    }, 16); // 약 60fps
}

// 자동 스크롤 정지
function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
}

// 마우스 이벤트 핸들러
sliderContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startY = e.pageY - sliderContainer.offsetTop;
    scrollTop = currentPosition;
    stopAutoScroll();
    slider.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;

    const y = e.pageY - sliderContainer.offsetTop;
    const walk = (y - startY);
    currentPosition = scrollTop + walk;
    updateSliderPosition();
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    slider.style.transition = 'transform 0.3s ease';
    startAutoScroll();
});

// 터치 이벤트 핸들러
sliderContainer.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    startY = e.touches[0].pageY - sliderContainer.offsetTop;
    scrollTop = currentPosition;
    stopAutoScroll();
    slider.style.transition = 'none';
});

document.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;

    const y = e.touches[0].pageY - sliderContainer.offsetTop;
    const walk = (y - startY);
    currentPosition = scrollTop + walk;
    updateSliderPosition();
});

document.addEventListener('touchend', () => {
    isMouseDown = false;
    slider.style.transition = 'transform 0.3s ease';
    startAutoScroll();
});

// 초기화
setupInfiniteSlider();
startAutoScroll();


//---홈 목업 애니메이션

$(document).ready(function () {
    MovingMock1();
    MovingMock2();
});

function MovingMock1() {
    $(".mock1").animate({ marginTop: "-180px" }, 2700, "swing", function () { // 위에서 아래로
        $(this).animate({ marginTop: "170px" }, 2700, "swing", function () {
            MovingMock1();
        });
    });
}

function MovingMock2() {
    $(".mock2").animate({ marginTop: "170px" }, 2700, "swing", function () { // 아래에서 위로
        $(this).animate({ marginTop: "-30px" }, 2700, "swing", function () {
            MovingMock2();
        });
    });
}

//--top버튼

// 버튼 스크롤 시 보이기/숨기기
window.onscroll = function () {
    const button = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

// 스크롤 애니메이션
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    scrollToTop();
});

function scrollToTop() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8); // 부드럽게 이동
    }
}


//--애니메이션 재생
const observerOptions = {
    root: null,
    threshold: 0.6
};

const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const wrapper = entry.target.querySelector('.wrapper');
        const ball = wrapper.querySelector('.ball');
        const rings = ball.querySelectorAll('.ring');

        if (entry.isIntersecting) {
            // 먼저 요소들을 보이게 함
            ball.style.visibility = 'visible';

            // 모든 애니메이션 초기화
            ball.style.animation = 'none';
            rings.forEach(ring => {
                ring.style.animation = 'none';
            });

            // 리플로우 강제 실행
            void wrapper.offsetWidth;

            // 애니메이션 제거하여 CSS에 정의된 애니메이션이 다시 적용되도록 함
            ball.style.animation = '';
            rings.forEach(ring => {
                ring.style.animation = '';
            });
        } else {
            // 뷰포트에서 벗어났을 때 숨김
            ball.style.visibility = 'hidden';
        }
    });
}, observerOptions);

// scene 요소 관찰 시작
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('.scene');
    if (scene) {
        // 초기 상태는 숨김
        const ball = scene.querySelector('.ball');
        if (ball) {
            ball.style.visibility = 'hidden';
        }
        sceneObserver.observe(scene);
    }
});

//--ai 인터랙션

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 요소가 뷰포트에 들어올 때 애니메이션 실행
            entry.target.classList.add('visible');
        } else {
            // 요소가 뷰포트에서 벗어날 때 클래스 제거
            entry.target.classList.remove('visible');

            // 애니메이션 리셋을 위해 잠시 대기 후 스타일 초기화
            setTimeout(() => {
                entry.target.querySelectorAll('.ai').forEach(ai => {
                    ai.style.animation = 'none';
                    ai.offsetHeight; // 리플로우 강제 실행
                    ai.style.animation = null;
                });
            }, 100);
        }
    });
}, {
    threshold: 0.5, // 20% 정도 보일 때 트리거
    rootMargin: '-50px' // 뷰포트 상단에서 50px 아래에서부터 감지 시작
});

// 모든 .aiV 요소에 observer 적용
document.querySelectorAll('.aiV').forEach(element => {
    observer.observe(element);
});

//menu

document.addEventListener("DOMContentLoaded", function () {
    const headerHeight = 80; // 헤더 높이 설정
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // 기본 이동 기능 중지

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
                const currentTop = window.pageYOffset;

                // 헤더 높이를 고려하여 스크롤 위치 조정
                const adjustedScrollTop = targetTop - headerHeight;

                window.scrollTo({
                    top: adjustedScrollTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});


//디자인 시스템

document.addEventListener("DOMContentLoaded", function () {
    // gridItems 선택자를 더 구체적으로 변경하여 원들을 제외
    const gridItems = document.querySelectorAll(".systemGrid > .font, .systemGrid > .mainColor, .systemGrid > .subColor1, .systemGrid > .subColor2, .systemGrid > .subColor3");
    const gridContainer = document.querySelector(".systemGrid-container");

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                gridItems.forEach((el, index) => {
                    let delay = 0;

                    if (index === 0 || index === 1) {
                        delay = 0.2;
                    } else if (index === 3) {
                        delay = 0.3;
                    } else if (index === 2 || index === 4) {
                        delay = 0.4;
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add("visible");
                });
            } else {
                gridItems.forEach(el => {
                    el.classList.remove("visible");
                    el.style.transitionDelay = '0s';
                });
            }
        });
    }, observerOptions);

    if (gridContainer) {
        observer.observe(gridContainer);
    }
});

//Vision-Value

document.addEventListener("DOMContentLoaded", function () {
    const svElements = document.querySelectorAll('.sv');
    const serviceContainer = document.querySelector('.service-value1');

    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 컨테이너가 화면에 보이면 모든 sv 요소에 애니메이션 적용
                svElements.forEach((el, index) => {
                    let delay = 0;

                    if (index === 0) {
                        delay = 0.2;
                    } else if (index === 1) {
                        delay = 0.4;
                    } else if (index === 2) {
                        delay = 0.6;
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add('visible');
                });
            } else {
                // 컨테이너가 화면에서 벗어나면 모든 sv 요소의 애니메이션 초기화
                svElements.forEach(el => {
                    el.classList.remove('visible');
                    el.style.transitionDelay = '0s';
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // service-value1 컨테이너 관찰 시작
    if (serviceContainer) {
        observer.observe(serviceContainer);
    }
});

//페르소나

document.addEventListener("DOMContentLoaded", function () {
    const perElements = document.querySelectorAll(".per");
    const personaContainer = document.querySelector(".persona1");

    // 옵저버 설정
    const observerOptions = {
        root: null,
        threshold: 0.3 // 요소가 30% 정도 화면에 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 컨테이너가 화면에 보이면 모든 per 요소에 애니메이션 적용
                perElements.forEach((el, index) => {
                    let delay = 0; // 기본 지연 시간

                    if (index === 0 || index === 1) {
                        delay = 0.2; // per1-1, per1-2
                    } else if (index === 2 || index === 3) {
                        delay = 0.4; // per1-3, per1-4
                    } else if (index === 4 || index === 5) {
                        delay = 0.8; // per1-5, per1-6
                    }

                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add("visible");
                });
            } else {
                // 컨테이너가 화면에서 벗어나면 모든 per 요소의 애니메이션 초기화
                perElements.forEach(el => {
                    el.classList.remove("visible");
                    el.style.transitionDelay = '0s';
                });
            }
        });
    }, observerOptions);

    // persona1 컨테이너 관찰 시작
    if (personaContainer) {
        observer.observe(personaContainer);
    }
});








//영상
function setupVideoControls(videoId, messageId, overlayId) {
    var video = document.getElementById(videoId);
    var message = document.getElementById(messageId);
    var overlay = document.getElementById(overlayId);

    if (!video) {
        console.error("비디오 요소를 찾을 수 없습니다:", videoId);
        return;
    }
    if (!message) {
        console.error("메시지 요소를 찾을 수 없습니다:", messageId);
        return;
    }
    if (!overlay) {
        console.error("오버레이 요소를 찾을 수 없습니다:", overlayId);
        return;
    }

    // 비디오가 로드될 때 메시지와 오버레이를 표시
    video.addEventListener('loadeddata', function () {
        console.log("비디오가 로드되었습니다.");
        message.style.display = 'block';
        overlay.style.display = 'block'; // 비디오가 로드되면 오버레이 표시
    });

    // 비디오 클릭 시 재생 또는 일시 정지
    video.addEventListener('click', function () {
        console.log("비디오가 클릭되었습니다.");
        if (video.paused) {
            video.play();
            message.style.display = 'none';
            overlay.style.display = 'none'; // 재생 시 오버레이 숨기기
        } else {
            video.pause();
            message.style.display = 'block';
            overlay.style.display = 'block'; // 일시 정지 시 오버레이 표시
        }
    });

    // 비디오 재생 시 오버레이 숨기기
    video.addEventListener('play', function () {
        console.log("비디오가 재생 중입니다.");
        message.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 비디오 일시정지 시 오버레이 표시
    video.addEventListener('pause', function () {
        console.log("비디오가 일시 정지되었습니다.");
        message.style.display = 'block';
        overlay.style.display = 'block';
    });
}

// DOM이 로드된 후에 비디오 제어 설정을 초기화
document.addEventListener('DOMContentLoaded', function () {
    setupVideoControls('videoF', 'playMessage', 'overlay');
});





//로고 그리드

// Logo Grid Animation
document.addEventListener("DOMContentLoaded", function () {
    const logoContainer = document.querySelector('.imgL');

    const resetAnimations = (element) => {
        // 모든 라인 리셋
        element.querySelectorAll('.line1').forEach(line => {
            line.style.animation = 'none';
            line.offsetHeight; // Trigger reflow
            line.style.animation = 'lineAnimation 1s linear forwards';
        });

        // 모든 수직선 리셋
        element.querySelectorAll('.perpe').forEach(perpe => {
            perpe.style.animation = 'none';
            perpe.offsetHeight; // Trigger reflow
            perpe.style.animation = 'verticalAnimation 1s linear forwards';
        });

        // 모든 대각선 리셋
        element.querySelectorAll('.diagonal').forEach(diagonal => {
            diagonal.style.animation = 'none';
            diagonal.offsetHeight; // Trigger reflow
            diagonal.style.animation = 'diagonalAnimation 1s linear forwards';
        });

        // 로고 이미지 리셋
        const logoGrid = element.querySelector('.logoGrid');
        if (logoGrid) {
            logoGrid.style.animation = 'none';
            logoGrid.offsetHeight; // Trigger reflow
            logoGrid.style.animation = 'fadeIn2 3s ease';
        }

        // 원형 요소들 리셋
        element.querySelectorAll('.circleG').forEach(circle => {
            circle.style.animation = 'none';
            circle.offsetHeight; // Trigger reflow
            circle.style.animation = 'fadeIn 5s forwards';
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 뷰포트에 들어올 때 모든 애니메이션 리셋 및 재시작
                resetAnimations(entry.target);
            }
        });
    }, {
        threshold: 0.7, // 50% 이상 보일 때 트리거
    });

    if (logoContainer) {
        observer.observe(logoContainer);
    }
});


//헤더 스크롤 삭제

let lastScrollTop = 0; // 사용자가 마지막으로 스크롤한 위치를 저장할 변수
const header = document.querySelector('header'); // 헤더 요소 선택

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // 아래로 스크롤할 때 헤더 숨기기
        header.style.top = "-80px"; // 헤더의 높이만큼 위로 올려 숨김
    } else {
        // 위로 스크롤할 때 헤더 보이기
        header.style.top = "0";
    }
    lastScrollTop = scrollTop; // 마지막 스크롤 위치 업데이트
});

//체크박스

window.addEventListener('scroll', function () {
    const parCheck = document.querySelector('.parCheck');
    const parCheckElements = document.querySelectorAll('.parCheck div'); // .parCheck 내의 모든 요소 선택
    const rectParCheck = parCheck.getBoundingClientRect();
    const windowHeight = window.innerHeight;


    if (rectParCheck.top <= windowHeight * 0.8 && rectParCheck.bottom >= 0) {
        parCheck.classList.add('visible');


        parCheckElements.forEach((el, index) => {
            let delay = 0;

            // 인덱스에 따라 지연 시간 설정
            if (index === 0 || index === 1 || index === 2 || index === 3) {
                delay = 0.2;
            } else if (index === 4 || index === 5 || index === 6 || index === 7) {
                delay = 0.5;
            } else if (index === 8 || index === 9 || index === 10 || index === 11) {
                delay = 0.9;
            }

            el.style.transitionDelay = `${delay}s`;
            el.classList.add("visible");
        });
    } else {
        parCheckElements.forEach(el => {
            el.classList.remove("visible");
            el.style.transitionDelay = '0s';
        });
    }
});

//환자알림

window.addEventListener('scroll', function () {
    const hospital3 = document.querySelector('.hospital3');
    const hospitalElements = document.querySelectorAll('.hospital3 .hos3 img');
    const rectHospital3 = hospital3.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // hospital3가 뷰포트의 30%에 도달했을 때
    if (rectHospital3.top <= windowHeight * 0.7 && rectHospital3.bottom >= 0) {
        hospitalElements.forEach((el, index) => {
            const delay = index * 0.3; // 각 요소에 대한 지연 시간 설정 (0.6초씩 증가)
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("visible");
        });
    } else {
        hospitalElements.forEach(el => {
            el.classList.remove("visible");
            el.style.transitionDelay = '0s';
        });
    }
});



//소스 버튼

const toggleButton = document.getElementById('source');
const content = document.getElementById('source-url');

toggleButton.addEventListener('click', () => {
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block'; // 내용 보이기
        toggleButton.textContent = '> SOURCE'; // 버튼 텍스트 변경
    } else {
        content.style.display = 'none'; // 내용 숨기기
        toggleButton.textContent = '> SOURCE'; // 버튼 텍스트 변경
    }
});


//div scroll

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.divScroll');

    const revealSection = () => {
        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < viewportHeight - 150) { // 섹션이 뷰포트의 150px 위에 도달하면
                section.classList.add('show');
            } else {
                section.classList.remove('show'); // 스크롤을 올릴 때 다시 숨김
            }
        });
    };

    window.addEventListener('scroll', revealSection);
});


//네비 영상 재생

// 네비게이션 비디오 컨트롤
document.addEventListener('DOMContentLoaded', function () {
    const navVideo = document.getElementById('navVideo');
    if (!navVideo) return;

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 비디오가 뷰포트에 들어왔을 때
                navVideo.currentTime = 0; // 시작 위치로 되감기
                navVideo.play();
            } else {
                // 비디오가 뷰포트에서 벗어났을 때는 일단 계속 재생
                // 다시 돌아왔을 때 처음부터 재생되도록 하기 위함
            }
        });
    }, {
        threshold: 0.1 // 10% 정도만 보여도 트리거
    });

    // navVideo 관찰 시작
    observer.observe(document.getElementById('navMain'));

    // 비디오 메타데이터 로드 완료 시 자동재생 시작
    navVideo.addEventListener('loadedmetadata', function () {
        navVideo.play();
    });

    // 에러 처리
    navVideo.addEventListener('error', function (e) {
        console.error('Navigation video error:', e);
    });
});