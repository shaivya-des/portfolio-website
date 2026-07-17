// <dotted-surface> — animated Three.js dot-wave background, scoped to its container.
(function () {
  if (customElements.get('dotted-surface')) return;

  class DottedSurface extends HTMLElement {
    connectedCallback() {
      this.style.cssText += 'display:block;position:absolute;inset:0;overflow:hidden;pointer-events:none;';
      this._ready = false;
      this._whenThree().then(() => this._init());
    }

    _whenThree() {
      return new Promise((resolve) => {
        const check = () => (window.THREE ? resolve() : setTimeout(check, 100));
        check();
      });
    }

    _init() {
      if (this._ready || !this.isConnected) return;
      this._ready = true;
      const THREE = window.THREE;

      const SEPARATION = 150, AMOUNTX = 40, AMOUNTY = 60;
      const w = this.clientWidth || 800, h = this.clientHeight || 600;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xf2f0ea, 2000, 10000);

      const camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
      camera.position.set(0, 355, 1220);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
      this.appendChild(renderer.domElement);

      const positions = [];
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions.push(
            ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
            0,
            iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
          );
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(this.getAttribute('dot-color') || '#141414'),
        size: 8,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(geometry, material));

      let count = 0;
      const attr = geometry.attributes.position;
      const arr = attr.array;
      const animate = () => {
        this._raf = requestAnimationFrame(animate);
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            arr[i * 3 + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }
        attr.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.05;
      };
      animate();

      this._ro = new ResizeObserver(() => {
        const nw = this.clientWidth, nh = this.clientHeight;
        if (!nw || !nh) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      });
      this._ro.observe(this);

      this._cleanup = () => {
        cancelAnimationFrame(this._raf);
        this._ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    disconnectedCallback() {
      if (this._cleanup) this._cleanup();
      this._ready = false;
    }
  }

  customElements.define('dotted-surface', DottedSurface);
})();
