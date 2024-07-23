<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  CubeTextureLoader,
  CubeReflectionMapping,
  SpotLight,
  AxesHelper,
  MeshLambertMaterial,
  DirectionalLight,
  Box3,
  Vector3,
} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const props = defineProps<{
  model: string
}>()

const experience = ref<HTMLCanvasElement | null>(null)

const scene = new Scene()
const camera = new PerspectiveCamera(75, 600 / 600, 0.1, 1000)

scene.add(new AxesHelper(5))

const setLights = () => {
  const light = new DirectionalLight(0xffffff, 1)
  const light_dos = new DirectionalLight(0xffffff, 1)
  light.position.set(5, 10, 7.5).normalize()
  light_dos.position.set(-5, -10, -7.5).normalize()
  scene.add(light)
  scene.add(light_dos)
}

setLights()

/* const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0x008080 })
)
scene.add(sphere) */

/**
 *
 */
onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: experience.value!,
  })
  renderer.setClearColor(0xffffff, 1)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  renderer.setSize(600, 600)

  const loader = new STLLoader()
  loader.load(
    props.model,
    function (geometry) {
      const material = new MeshLambertMaterial({ color: 0xd3d3d3 })
      const mesh = new Mesh(geometry, material)

      //mesh.rotation.x = -Math.PI / 6
      //mesh.rotation.y = Math.PI / 2
      //mesh.position.y = -90
      scene.add(mesh)

      const bbox = new Box3().setFromObject(mesh)
      const center = bbox.getCenter(new Vector3())
      const size = bbox.getSize(new Vector3())

      mesh.position.x = -center.x
      mesh.position.y = -center.y
      mesh.position.z = -center.z

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs((maxDim / 2) * Math.tan(fov * 2))
      cameraZ *= 5.5 // Add some extra distance

      // Set the camera position and look at the center of the mesh
      camera.position.set(0, 0, cameraZ)
      camera.lookAt(new Vector3(0, 0, 0))

      // Update controls
      controls.update()
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.log(error)
    }
  )
  // Render loop
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})
</script>
<template>
  <div style="height: 600px; width: 600px">
    <canvas ref="experience" />
  </div>
</template>
