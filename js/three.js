// Scene, Camera, Renderer 설정 함수
function setupScene(containerId, objPath, sceneKey, {
    materialColor = 0xFFFFFF,
    shininess = 100,
    specular = 0x666666,
    wireframe = false,
    transparent = true,
    opacity = 1,
    roughness = 0,
    scaleX = 0.7,
    scaleY = 0.5,
    scaleZ = 0.5,
    positionX = -0.05,
    positionY = 0,
    positionZ = -5
}) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 조명 설정
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // 재질 설정
    const material = new THREE.MeshPhongMaterial({
        color: materialColor,
        shininess: shininess,
        specular: specular,
        wireframe: wireframe,
        transparent: transparent,
        opacity: opacity,
        roughness: roughness
    });

    // OBJ 로더 설정
    const objLoader = new THREE.OBJLoader();
    objLoader.setPath('3d/');
    objLoader.load(objPath, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        object.scale.set(scaleX, scaleY, scaleZ);
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);

        const group = new THREE.Group();
        group.add(object);
        group.position.set(positionX, positionY, positionZ);
        scene.add(group);

        // 기본 각도 저장
        sceneStates[sceneKey].defaultRotation.x = group.rotation.x;
        sceneStates[sceneKey].defaultRotation.y = group.rotation.y;
        sceneStates[sceneKey].lastAutoRotation = group.rotation.y;
    });

    camera.position.z = 5;

    return { scene, camera, renderer };
}

// 상태 관리를 위한 객체
const sceneStates = {
    scene1: {
        isInteractive: false,
        mouseX: 0,
        mouseY: 0,
        targetX: 0,
        targetY: 0,
        autoRotateSpeed: 0.02,
        defaultRotation: { x: 0, y: 0 },
        lastAutoRotation: 0
    },
    scene2: {
        isInteractive: false,
        mouseX: 0,
        mouseY: 0,
        targetX: 0,
        targetY: 0,
        autoRotateSpeed: 0.02,
        defaultRotation: { x: 0, y: 0 },
        lastAutoRotation: 0
    },
    scene3: {
        isInteractive: false,
        mouseX: 0,
        mouseY: 0,
        targetX: 0,
        targetY: 0,
        autoRotateSpeed: 0.02,
        defaultRotation: { x: 0, y: 0 },
        lastAutoRotation: 0
    }
};

// 씬 생성
const scene1 = setupScene('three1', 'one.obj', 'scene1', {
    materialColor: 0xE0FD48,
    shininess: 100,
    specular: 0x666666,
    scaleX: 0.55,
    scaleY: 0.5,
    scaleZ: 0.5,
    positionX: -0.05,
    positionY: 0,
    positionZ: -5
});

const scene2 = setupScene('three2', 'two.obj', 'scene2', {
    materialColor: 0xFF3E3E,
    shininess: 80,
    specular: 0x777777,
    scaleX: 0.8,
    scaleY: 0.5,
    scaleZ: 0.5,
    positionX: -0.05,
    positionY: 0,
    positionZ: -8
});

const scene3 = setupScene('three3', 'three.obj', 'scene3', {
    materialColor: 0x0177FF,
    shininess: 120,
    specular: 0x555555,
    scaleX: 0.6,
    scaleY: 0.5,
    scaleZ: 0.5,
    positionX: -0.05,
    positionY: 0,
    positionZ: -7
});

// 마우스 이벤트 처리
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function updateMousePosition(event, state) {
    state.mouseX = (event.clientX - windowHalfX) / 100;
    state.mouseY = (event.clientY - windowHalfY) / 100;
}

// 씬의 오브젝트를 가져오는 헬퍼 함수
function getSceneObject(sceneKey) {
    const sceneMap = {
        scene1: scene1,
        scene2: scene2,
        scene3: scene3
    };
    return sceneMap[sceneKey].scene.children[2];
}

// 인터랙티브 상태 설정 함수
function setInteractiveState(sceneKey, state) {
    const sceneState = sceneStates[sceneKey];

    if (state) {
        // 인터랙티브 모드로 전환 시
        Object.keys(sceneStates).forEach(key => {
            sceneStates[key].isInteractive = false;
        });
        sceneState.isInteractive = true;

        // 현재 회전 각도를 타겟으로 설정하여 부드러운 전환
        const object = getSceneObject(sceneKey);
        if (object) {
            sceneState.targetX = object.rotation.y;
            sceneState.targetY = object.rotation.x;
            sceneState.mouseX = object.rotation.y;
            sceneState.mouseY = object.rotation.x;
        }
    } else {
        // 자동 회전 모드로 전환 시
        sceneState.isInteractive = false;

        // 기본 각도로 복원
        const object = getSceneObject(sceneKey);
        if (object) {
            object.rotation.x = sceneState.defaultRotation.x;
            object.rotation.y = sceneState.defaultRotation.y;
            sceneState.lastAutoRotation = sceneState.defaultRotation.y;
        }
    }
}

// 클릭 이벤트 리스너
document.getElementById('three1').addEventListener('click', (e) => {
    e.stopPropagation();
    setInteractiveState('scene1', true);
});

document.getElementById('three2').addEventListener('click', (e) => {
    e.stopPropagation();
    setInteractiveState('scene2', true);
});

document.getElementById('three3').addEventListener('click', (e) => {
    e.stopPropagation();
    setInteractiveState('scene3', true);
});

// 문서 클릭 시 모든 인터랙션 비활성화
document.addEventListener('click', () => {
    Object.keys(sceneStates).forEach(key => {
        setInteractiveState(key, false);
    });
});

// 마우스 움직임 이벤트
document.addEventListener('mousemove', (event) => {
    Object.keys(sceneStates).forEach(key => {
        if (sceneStates[key].isInteractive) {
            updateMousePosition(event, sceneStates[key]);
        }
    });
});

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);

    // Scene 1 애니메이션
    if (scene1.scene.children[2]) {
        const object1 = scene1.scene.children[2];
        if (sceneStates.scene1.isInteractive) {
            sceneStates.scene1.targetX = sceneStates.scene1.mouseX * 1;
            sceneStates.scene1.targetY = sceneStates.scene1.mouseY * 1;
            object1.rotation.y += 0.05 * (sceneStates.scene1.targetX - object1.rotation.y);
            object1.rotation.x += 0.05 * (sceneStates.scene1.targetY - object1.rotation.x);
        } else {
            sceneStates.scene1.lastAutoRotation += sceneStates.scene1.autoRotateSpeed;
            object1.rotation.y = sceneStates.scene1.lastAutoRotation;
        }
    }

    // Scene 2 애니메이션
    if (scene2.scene.children[2]) {
        const object2 = scene2.scene.children[2];
        if (sceneStates.scene2.isInteractive) {
            sceneStates.scene2.targetX = sceneStates.scene2.mouseX * 1;
            sceneStates.scene2.targetY = sceneStates.scene2.mouseY * 1;
            object2.rotation.y += 0.05 * (sceneStates.scene2.targetX - object2.rotation.y);
            object2.rotation.x += 0.05 * (sceneStates.scene2.targetY - object2.rotation.x);
        } else {
            sceneStates.scene2.lastAutoRotation += sceneStates.scene2.autoRotateSpeed;
            object2.rotation.y = sceneStates.scene2.lastAutoRotation;
        }
    }

    // Scene 3 애니메이션
    if (scene3.scene.children[2]) {
        const object3 = scene3.scene.children[2];
        if (sceneStates.scene3.isInteractive) {
            sceneStates.scene3.targetX = sceneStates.scene3.mouseX * 1;
            sceneStates.scene3.targetY = sceneStates.scene3.mouseY * 1;
            object3.rotation.y += 0.05 * (sceneStates.scene3.targetX - object3.rotation.y);
            object3.rotation.x += 0.05 * (sceneStates.scene3.targetY - object3.rotation.x);
        } else {
            sceneStates.scene3.lastAutoRotation += sceneStates.scene3.autoRotateSpeed;
            object3.rotation.y = sceneStates.scene3.lastAutoRotation;
        }
    }

    // 렌더링
    scene1.renderer.render(scene1.scene, scene1.camera);
    scene2.renderer.render(scene2.scene, scene2.camera);
    scene3.renderer.render(scene3.scene, scene3.camera);
}

// 반응형 처리
window.addEventListener('resize', () => {
    ['three1', 'three2', 'three3'].forEach((id, index) => {
        const container = document.getElementById(id);
        const width = container.clientWidth;
        const height = container.clientHeight;
        const scene = [scene1, scene2, scene3][index];

        scene.renderer.setSize(width, height);
        scene.camera.aspect = width / height;
        scene.camera.updateProjectionMatrix();
    });
});

// 애니메이션 시작
animate();