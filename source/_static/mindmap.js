(function () {
  const mapData = {
    id: "embodied",
    title: "具身智能",
    subtitle: "从感知到行动",
    link: "index.html",
    children: [
      {
        id: "algorithm",
        title: "算法",
        subtitle: "模型与训练方法",
        link: "algorithm/index.html",
        children: [
          {
            id: "basic",
            title: "基础模型",
            subtitle: "Transformer / CLIP / ViT",
            link: "algorithm/basic/index.html",
            children: [
              { id: "transformer", title: "Transformer", link: "algorithm/basic/transformer.html" },
              { id: "clip", title: "CLIP", link: "algorithm/basic/clip.html" },
              { id: "blip", title: "BLIP", link: "algorithm/basic/blip.html" },
              { id: "dino", title: "DINO", link: "algorithm/basic/dino.html" },
              { id: "vit", title: "ViT", link: "algorithm/basic/vit.html" },
              { id: "llava", title: "LLaVA", link: "algorithm/basic/llava.html" },
              { id: "qwen-vl", title: "Qwen-VL", link: "algorithm/basic/qwen_vl.html" },
              { id: "siglip", title: "SigLIP", link: "algorithm/basic/siglip.html" }
            ]
          },
          {
            id: "vla",
            title: "VLA",
            subtitle: "视觉语言到动作",
            link: "algorithm/vla/overview.html",
            children: [
              { id: "act", title: "ACT", link: "algorithm/vla/act.html" },
              { id: "dp", title: "Diffusion Policy", link: "algorithm/vla/dp.html" },
              { id: "openvla", title: "OpenVLA", link: "algorithm/vla/openvla.html" },
              { id: "smolvla", title: "SmolVLA", link: "algorithm/vla/smolvla.html" },
              { id: "pi0", title: "π0", link: "algorithm/vla/pi0.html" },
              { id: "pi05", title: "π0.5", link: "algorithm/vla/pi0_5.html" },
              { id: "pi06", title: "π0.6", link: "algorithm/vla/pi0_6.html" }
            ]
          },
          {
            id: "world-model",
            title: "World Model",
            subtitle: "预测世界如何变化",
            link: "algorithm/world_model/overview.html",
            children: [
              {
                id: "basic-wm",
                title: "基础 WM",
                link: "algorithm/world_model/basic_wm/index.html",
                children: [
                  { id: "planet", title: "PlaNet", link: "algorithm/world_model/basic_wm/planet.html" },
                  { id: "sora", title: "Sora", link: "algorithm/world_model/basic_wm/sora.html" },
                  { id: "vjepa", title: "V-JEPA", link: "algorithm/world_model/basic_wm/v_jepa.html" },
                  { id: "wan", title: "WAN", link: "algorithm/world_model/basic_wm/wan.html" },
                  { id: "dreamdojo", title: "DreamDojo", link: "algorithm/world_model/basic_wm/dreamdojo.html" },
                  { id: "enerverse", title: "EnerVerse", link: "algorithm/world_model/basic_wm/enerverse.html" },
                  { id: "ctrl-world", title: "Ctrl-World", link: "algorithm/world_model/basic_wm/ctrl_world.html" }
                ]
              },
              { id: "wm-il", title: "WM for IL", link: "algorithm/world_model/wm_for_il/index.html" },
              { id: "wm-rl", title: "WM for RL", link: "algorithm/world_model/wm_for_rl/index.html" }
            ]
          },
          {
            id: "wam",
            title: "WAM",
            subtitle: "世界和动作联合建模",
            link: "algorithm/wam/overview.html",
            children: [
              {
                id: "cascaded-wam",
                title: "Cascaded WAM",
                subtitle: "先世界后动作",
                link: "algorithm/wam/cascaded_wam/index.html",
                children: [
                  { id: "explicit", title: "Explicit", link: "algorithm/wam/cascaded_wam/explicit/index.html" },
                  { id: "implicit", title: "Implicit", link: "algorithm/wam/cascaded_wam/implicit/index.html" }
                ]
              },
              {
                id: "joint-wam",
                title: "Joint WAM",
                subtitle: "动作和未来一起生成",
                link: "algorithm/wam/joint_wam/index.html",
                children: [
                  { id: "diffusion-wam", title: "扩散式", link: "algorithm/wam/joint_wam/diffusion/index.html" },
                  { id: "ar-wam", title: "自回归", link: "algorithm/wam/joint_wam/autoregressive/index.html" }
                ]
              }
            ]
          },
          {
            id: "rl",
            title: "强化学习",
            subtitle: "RL 与后训练",
            link: "algorithm/rl/index.html",
            children: [
              { id: "rl-basic", title: "RL 基础", link: "algorithm/rl/rl_basic/index.html" },
              { id: "online-rl", title: "Online RL", link: "algorithm/rl/online_rl/index.html" },
              { id: "vla-post", title: "VLA Post Training", link: "algorithm/rl/vla_post_training/index.html" }
            ]
          }
        ]
      },
      {
        id: "platform",
        title: "平台框架",
        subtitle: "工具链与评测",
        link: "platform_framework/index.html",
        children: [
          { id: "benchmark", title: "Benchmark", link: "platform_framework/benchmark.html" },
          { id: "robot-stack", title: "Robot Stack", link: "platform_framework/robot_stack/index.html" },
          { id: "vla-framework", title: "VLA Framework", link: "platform_framework/vla_framework/index.html" }
        ]
      },
      {
        id: "simulation",
        title: "仿真",
        subtitle: "环境与机器人实验",
        link: "simulation/index.html",
        children: [
          { id: "mujoco", title: "MuJoCo", link: "simulation/mujoco.html" }
        ]
      }
    ]
  };

  const state = {
    collapsed: new Set([
      "basic",
      "vla",
      "world-model",
      "wam",
      "rl",
      "platform",
      "simulation"
    ]),
    scale: 0.82,
    tx: 80,
    ty: 80,
    dragging: false,
    pointer: null
  };

  function cloneVisible(node, depth) {
    const copy = {
      id: node.id,
      title: node.title,
      subtitle: node.subtitle || "",
      link: node.link || "",
      depth,
      hasChildren: Boolean(node.children && node.children.length),
      children: []
    };
    if (!state.collapsed.has(node.id) && node.children) {
      copy.children = node.children.map((child) => cloneVisible(child, depth + 1));
    }
    return copy;
  }

  function measureTitle(text) {
    const chars = Array.from(text || "").length;
    return Math.max(128, Math.min(230, chars * 15 + 46));
  }

  function layout(root) {
    const levels = [];
    let row = 0;

    function walk(node, depth) {
      node.depth = depth;
      levels[depth] = Math.max(levels[depth] || 0, measureTitle(node.title));
      if (!node.children.length) {
        node.y = row * 78;
        row += 1;
      } else {
        node.children.forEach((child) => walk(child, depth + 1));
        node.y = (node.children[0].y + node.children[node.children.length - 1].y) / 2;
      }
    }

    walk(root, 0);

    const offsets = [];
    levels.reduce((acc, width, index) => {
      offsets[index] = acc + width / 2;
      return acc + width + 96;
    }, 30);

    function assignX(node) {
      node.width = levels[node.depth];
      node.x = offsets[node.depth];
      node.children.forEach(assignX);
    }

    assignX(root);

    return {
      width: offsets[offsets.length - 1] + levels[levels.length - 1] / 2 + 80,
      height: Math.max(row * 78 + 80, 520),
      root
    };
  }

  function flatten(root) {
    const nodes = [];
    const links = [];
    function walk(node) {
      nodes.push(node);
      node.children.forEach((child) => {
        links.push({ source: node, target: child });
        walk(child);
      });
    }
    walk(root);
    return { nodes, links };
  }

  function nodeColors(depth, hasChildren) {
    if (depth === 0) return ["var(--mindmap-root)", "var(--mindmap-root-border)"];
    if (depth === 1) return ["var(--mindmap-section)", "var(--mindmap-section-border)"];
    if (hasChildren) return ["var(--mindmap-topic)", "var(--mindmap-topic-border)"];
    return ["var(--mindmap-leaf)", "var(--mindmap-leaf-border)"];
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function appendText(group, className, text, x, y) {
    const el = svgEl("text", { class: className, x, y, "text-anchor": "middle" });
    el.textContent = text;
    group.appendChild(el);
    return el;
  }

  function renderNode(group, node, rerender) {
    const height = node.subtitle ? 58 : 46;
    const [fill, stroke] = nodeColors(node.depth, node.hasChildren);
    const item = svgEl("g", {
      class: "mindmap-node",
      tabindex: "0",
      transform: `translate(${node.x},${node.y + 40})`
    });
    const rect = svgEl("rect", {
      x: -node.width / 2,
      y: -height / 2,
      width: node.width,
      height,
      rx: 10,
      fill,
      stroke,
      "stroke-width": 2
    });
    item.appendChild(rect);
    appendText(item, "mindmap-node-title", node.title, 0, node.subtitle ? -5 : 5);
    if (node.subtitle) appendText(item, "mindmap-node-subtitle", node.subtitle, 0, 20);

    if (node.hasChildren) {
      const toggle = svgEl("circle", {
        class: "mindmap-toggle",
        cx: node.width / 2 - 16,
        cy: -height / 2 + 16,
        r: 10
      });
      item.appendChild(toggle);
      appendText(
        item,
        "mindmap-toggle-label",
        state.collapsed.has(node.id) ? "+" : "-",
        node.width / 2 - 16,
        -height / 2 + 21
      );
    } else if (node.link) {
      const open = svgEl("circle", {
        class: "mindmap-open-link",
        cx: node.width / 2 - 16,
        cy: -height / 2 + 16,
        r: 10
      });
      item.appendChild(open);
      appendText(item, "mindmap-open-label", ">", node.width / 2 - 16, -height / 2 + 21);
    }

    item.addEventListener("click", (event) => {
      event.stopPropagation();
      if (node.hasChildren) {
        if (state.collapsed.has(node.id)) state.collapsed.delete(node.id);
        else state.collapsed.add(node.id);
        rerender();
      } else if (node.link) {
        window.location.href = node.link;
      }
    });
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    group.appendChild(item);
  }

  function setTransform(view) {
    view.setAttribute("transform", `translate(${state.tx},${state.ty}) scale(${state.scale})`);
  }

  function render(container, svg, view) {
    view.replaceChildren();
    const visible = cloneVisible(mapData, 0);
    const laidOut = layout(visible);
    const { nodes, links } = flatten(laidOut.root);
    svg.setAttribute("viewBox", `0 0 ${laidOut.width + 220} ${laidOut.height + 120}`);

    const linkGroup = svgEl("g", { class: "mindmap-links" });
    links.forEach((link) => {
      const sx = link.source.x + link.source.width / 2;
      const sy = link.source.y + 40;
      const tx = link.target.x - link.target.width / 2;
      const ty = link.target.y + 40;
      const mid = (sx + tx) / 2;
      linkGroup.appendChild(svgEl("path", {
        class: "mindmap-link",
        d: `M${sx},${sy} C${mid},${sy} ${mid},${ty} ${tx},${ty}`
      }));
    });
    view.appendChild(linkGroup);

    const nodeGroup = svgEl("g", { class: "mindmap-nodes" });
    nodes.forEach((node) => renderNode(nodeGroup, node, () => render(container, svg, view)));
    view.appendChild(nodeGroup);
    setTransform(view);
  }

  function bindToolbar(container, rerender) {
    container.querySelectorAll("[data-mindmap-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("data-mindmap-action");
        if (action === "zoom-in") state.scale = Math.min(2.2, state.scale * 1.15);
        if (action === "zoom-out") state.scale = Math.max(0.32, state.scale / 1.15);
        if (action === "reset") {
          state.scale = 0.82;
          state.tx = 80;
          state.ty = 80;
        }
        if (action === "expand") state.collapsed.clear();
        if (action === "collapse") {
          state.collapsed = new Set(["basic", "vla", "world-model", "wam", "rl", "platform", "simulation"]);
        }
        rerender();
      });
    });
  }

  function bindPanZoom(svg, view) {
    svg.addEventListener("wheel", (event) => {
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      const beforeX = (px - state.tx) / state.scale;
      const beforeY = (py - state.ty) / state.scale;
      const next = event.deltaY < 0 ? state.scale * 1.12 : state.scale / 1.12;
      state.scale = Math.max(0.32, Math.min(2.2, next));
      state.tx = px - beforeX * state.scale;
      state.ty = py - beforeY * state.scale;
      setTransform(view);
    }, { passive: false });

    svg.addEventListener("pointerdown", (event) => {
      if (event.target.closest && event.target.closest(".mindmap-node")) return;
      state.dragging = true;
      state.pointer = { x: event.clientX, y: event.clientY };
      svg.classList.add("is-panning");
      svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener("pointermove", (event) => {
      if (!state.dragging || !state.pointer) return;
      state.tx += event.clientX - state.pointer.x;
      state.ty += event.clientY - state.pointer.y;
      state.pointer = { x: event.clientX, y: event.clientY };
      setTransform(view);
    });
    svg.addEventListener("pointerup", (event) => {
      state.dragging = false;
      state.pointer = null;
      svg.classList.remove("is-panning");
      if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    });
    svg.addEventListener("pointercancel", () => {
      state.dragging = false;
      state.pointer = null;
      svg.classList.remove("is-panning");
    });
  }

  function init() {
    const container = document.getElementById("embodied-mindmap");
    if (!container) return;
    container.innerHTML = [
      '<div class="mindmap-toolbar" aria-label="思维导图控制">',
      '<button type="button" data-mindmap-action="zoom-in" title="放大">+</button>',
      '<button type="button" data-mindmap-action="zoom-out" title="缩小">-</button>',
      '<button type="button" data-mindmap-action="reset" title="重置视图">Reset</button>',
      '<button type="button" data-mindmap-action="expand" title="展开全部">Expand</button>',
      '<button type="button" data-mindmap-action="collapse" title="折叠">Fold</button>',
      '</div>',
      '<svg class="mindmap-canvas" role="img" aria-label="具身智能知识结构图"></svg>'
    ].join("");

    const svg = container.querySelector("svg");
    const view = svgEl("g", { class: "mindmap-view" });
    svg.appendChild(view);
    const rerender = () => render(container, svg, view);
    bindToolbar(container, rerender);
    bindPanZoom(svg, view);
    rerender();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
