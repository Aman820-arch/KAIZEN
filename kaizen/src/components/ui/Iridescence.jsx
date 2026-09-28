import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

/**
 * Adapted from React Bits' Iridescence background
 * (https://reactbits.dev/backgrounds/iridescence — MIT + Commons Clause,
 * David Haz). Shader and render loop are the original component;
 * packaging only (props pruned to what KAIZEN uses).
 *
 * Unlike a banded aurora, this shader colors the entire canvas on every
 * frame — there's no risk of a section reading as "mostly empty" the way
 * a sparse noise-band effect can. `color` tints the whole result, so a
 * muted KAIZEN triple reads as a moving sapphire/mother-of-pearl sheen
 * rather than a full RGB rainbow.
 */

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  className,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined
    const container = containerRef.current

    let renderer
    try {
      renderer = new Renderer()
    } catch {
      return undefined
    }
    const gl = renderer.gl
    gl.clearColor(1, 1, 1, 1)

    let program
    const mousePos = { x: 0.5, y: 0.5 }

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height,
        )
      }
    }
    window.addEventListener('resize', resize)
    resize()

    const geometry = new Triangle(gl)
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        uMouse: { value: new Float32Array([mousePos.x, mousePos.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    container.appendChild(gl.canvas)

    function handleMouseMove(event) {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1.0 - (event.clientY - rect.top) / rect.height
      program.uniforms.uMouse.value[0] = x
      program.uniforms.uMouse.value[1] = y
    }
    if (mouseReact) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    let animationFrameId
    function update(t) {
      animationFrameId = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }
    animationFrameId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      if (mouseReact) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [color, speed, amplitude, mouseReact])

  return <div ref={containerRef} className={className} />
}
