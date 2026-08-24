import { useEffect, useRef } from 'react';

const VS = `attribute vec2 a_position;varying vec2 vUv;void main(){vUv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;
const FS = `precision highp float;uniform float uTime;uniform vec3 uColor;uniform vec2 uResolution;uniform vec2 uMouse;uniform float uAmp;uniform float uSpeed;varying vec2 vUv;void main(){float mr=min(uResolution.x,uResolution.y);vec2 uv=(vUv*2.0-1.0)*uResolution.xy/mr;uv+=(uMouse-vec2(0.5))*uAmp;float d=-uTime*0.5*uSpeed;float a=0.0;for(float i=0.0;i<6.0;++i){a+=cos(i-d-a*uv.x);d+=sin(uv.y*i+a);}d+=uTime*0.5*uSpeed;vec3 col=vec3(cos(uv*vec2(d,a))*0.6+0.4,cos(a+d)*0.5+0.5);col=cos(col*cos(vec3(d,a,2.5))*0.5+0.5)*uColor;gl_FragColor=vec4(col,1.0);}`;

function createShader(gl, src, type) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
    }
    return sh;
}

export default function IridescenceCanvas({ targetRef }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return undefined;
        if (document.documentElement.classList.contains('low-power')) {
            cv.style.display = 'none';
            return undefined;
        }
        const gl = cv.getContext('webgl') || cv.getContext('experimental-webgl');
        if (!gl) return undefined;

        const vsh = createShader(gl, VS, gl.VERTEX_SHADER);
        const fsh = createShader(gl, FS, gl.FRAGMENT_SHADER);
        if (!vsh || !fsh) return undefined;

        const p = gl.createProgram();
        gl.attachShader(p, vsh);
        gl.attachShader(p, fsh);
        gl.linkProgram(p);

        const pL = gl.getAttribLocation(p, 'a_position');
        const tL = gl.getUniformLocation(p, 'uTime');
        const cL = gl.getUniformLocation(p, 'uColor');
        const rL = gl.getUniformLocation(p, 'uResolution');
        const mL = gl.getUniformLocation(p, 'uMouse');
        const aL = gl.getUniformLocation(p, 'uAmp');
        const sL = gl.getUniformLocation(p, 'uSpeed');

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

        const color = [0.145, 0.388, 0.922];
        const ms = { x: 0.5, y: 0.5 };
        const PIXEL_RATIO = Math.min(0.85, window.devicePixelRatio || 1);

        function rs() {
            const host = targetRef && targetRef.current;
            if (!host) return;
            const r = host.getBoundingClientRect();
            cv.width = Math.floor(r.width * PIXEL_RATIO);
            cv.height = Math.floor(r.height * PIXEL_RATIO);
            cv.style.width = r.width + 'px';
            cv.style.height = r.height + 'px';
            gl.viewport(0, 0, cv.width, cv.height);
        }

        let resizeT;
        const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(rs, 150); };
        window.addEventListener('resize', onResize);
        rs();

        let mouseT;
        function onMouseMove(e) {
            const r = cv.getBoundingClientRect();
            ms.x = (e.clientX - r.left) / r.width;
            ms.y = 1.0 - (e.clientY - r.top) / r.height;
            clearTimeout(mouseT);
            mouseT = setTimeout(() => { ms.x = 0.5; ms.y = 0.5; }, 400);
        }
        cv.addEventListener('mousemove', onMouseMove);

        let running = true;
        let rafId = null;
        let io = null;
        const host = targetRef && targetRef.current;
        if (host && 'IntersectionObserver' in window) {
            io = new IntersectionObserver((entries) => {
                running = entries[0].isIntersecting;
                if (running && !rafId) rafId = requestAnimationFrame(render);
            }, { rootMargin: '50px' });
            io.observe(host);
        }

        function render(time) {
            if (!running) { rafId = null; return; }
            rafId = requestAnimationFrame(render);
            gl.useProgram(p);
            gl.uniform1f(tL, time * 0.001);
            gl.uniform3fv(cL, color);
            gl.uniform2f(rL, cv.width, cv.height);
            gl.uniform2f(mL, ms.x, ms.y);
            gl.uniform1f(aL, 0.1);
            gl.uniform1f(sL, 1.0);
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.enableVertexAttribArray(pL);
            gl.vertexAttribPointer(pL, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        rafId = requestAnimationFrame(render);

        return function cleanup() {
            if (rafId) cancelAnimationFrame(rafId);
            clearTimeout(resizeT);
            clearTimeout(mouseT);
            window.removeEventListener('resize', onResize);
            cv.removeEventListener('mousemove', onMouseMove);
            if (io) io.disconnect();
        };
    }, [targetRef]);

    return <canvas id="iridescenceCanvas" ref={canvasRef}></canvas>;
}
