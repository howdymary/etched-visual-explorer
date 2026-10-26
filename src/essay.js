export const essay = {
  "title": "Build From the Rack In",
  "deck": "Inference is a chance to rethink the machine around the silicon—and give experienced engineering judgment more room to act.",
  "kicker": "Engineering / The whole inference system",
  "introduction": [
    "The reason to leave a team that builds extraordinary chips has to be a better engineering problem. After several generations of silicon, the interesting moments arrive when your conclusion is bigger than your block: the memory organization should change; the scheduler is asking the hardware for the wrong thing; the thermal solution is setting the architectural limit.",
    "An AI-native lab should be a place where those observations can shape the machine. That takes proximity to the workload, engineers who can reason across boundaries, and tools that make a hard idea faster to evaluate. Etched’s inference systems put those boundaries in play. Start with the rack and follow the hardware inward."
  ],
  "sections": [
    {
      "chapter": 0,
      "id": "experience",
      "title": "System: start at the rack",
      "paragraphs": [
        "From the aisle, the rack looks like a finished object. Inside it, decisions about arithmetic, memory, communication, power, and heat are still negotiating with one another. The result reaches a user as an answer delivered under a latency and cost constraint. That is the performance the machine has to sustain.",
        "Etched describes co-design across chips, racks, software, and manufacturing. A constraint found at one layer can be a reason to revisit another. A thermal limit can reach the circuit. A workload characteristic can reach the memory system.",
        "For an experienced engineer, that is a reason to consider a different environment. The hard-earned ability to identify the wrong assumption becomes more valuable when the people who can change it are close enough to work through the consequence."
      ],
      "sourceLinks": [
        {
          "label": "Etched: Frontier Inference Clusters",
          "url": "https://www.etched.com/progress/frontier-inference-clusters"
        }
      ]
    },
    {
      "chapter": 1,
      "id": "requirements",
      "title": "Tray and package: expose the physical bargain",
      "paragraphs": [
        "Slide the tray out. As tubing and cold plates lift away, the view moves toward the package. What disappears visually remains essential to the engineering: every surrounding layer helps establish the conditions under which the silicon can operate.",
        "Etched’s low-voltage inference work connects math arrays and scheduling with power delivery, packaging, and cold plates. Voltage is therefore a system bet. The circuit must meet timing and operating requirements; the surrounding machine must make that operating point useful.",
        "Seen from the package, an architectural choice acquires physical consequences: paths, connections, margins, power integrity, and heat. Experience matters at these interfaces, where a promising local idea encounters the constraints that decide whether it belongs in the machine. The tray is the first place those disciplines become visibly inseparable."
      ],
      "sourceLinks": [
        {
          "label": "Etched: Low-voltage inference and system co-design",
          "url": "https://www.etched.com/progress/frontier-inference-clusters"
        }
      ]
    },
    {
      "chapter": 2,
      "id": "architecture",
      "title": "Chip architecture: remove the cover, follow the data",
      "paragraphs": [
        "Now the package opens into a conceptual view of the chip. Compute and memory remain distinct; the view follows their dataflow. A single accelerator becomes a set of obligations: deliver operands, prepare representations, keep arithmetic occupied, and move results without turning the next stage into the bottleneck.",
        "Etched’s Cluster Scale Memory combines HBM and SRAM with a shared memory pool across its scale-up domain and a purpose-built interconnect. It places memory behavior among the central architectural bets. The relevant boundary extends beyond one die.",
        "This is fertile ground for someone who has watched an elegant block wait on the rest of the system. The useful insight may concern allocation, scheduling, communication, or the contract between them. Its value lies in changing the assumption that limits the workload."
      ],
      "sourceLinks": [
        {
          "label": "Etched: Cluster Scale Memory",
          "url": "https://www.etched.com/progress/frontier-inference-clusters"
        }
      ]
    },
    {
      "chapter": 3,
      "id": "quantization",
      "title": "Numerical formats: carry the representation through",
      "paragraphs": [
        "Follow the operands toward compute. A lower-precision format changes storage and traffic, but also grouping, scales, layout, conversion, accumulation, and error. A favorable payload calculation is only the beginning of the implementation argument.",
        "The eight-bit and four-bit views isolate that payload change. In a real design, the surrounding path must carry the metadata and perform the required transformations at the accepted rate. Numerical quality has to survive the intended workload. A designer who understands both the format and its physical consequences can recognize when an apparent efficiency has simply become work somewhere else."
      ],
      "sourceLinks": []
    },
    {
      "chapter": 4,
      "id": "microarchitecture",
      "title": "RTL: a pipeline decision travels",
      "paragraphs": [
        "Inside the arithmetic path, the decisions become cycle-specific. Add a stage and the timing problem changes, along with latency, live state, clock load, and the receiving block’s obligations. Remove storage and a different path may become difficult to close. The neighboring logic inherits the consequence.",
        "Years of implementation experience make those consequences easier to anticipate. That judgment is especially useful when a tool can produce more candidates than an engineer could write by hand. The scarce resource becomes the ability to choose a meaningful comparison and recognize which candidate deserves deeper evaluation. Even the small datapath shown here has obligations that reach beyond it."
      ],
      "sourceLinks": []
    },
    {
      "chapter": 5,
      "id": "verification",
      "title": "Verification: keep a separate account of intent",
      "paragraphs": [
        "More candidates increase the importance of independent reasoning. An implementation and a test generated from the same mistaken assumption can agree perfectly. The specification still has to establish numerical behavior, ordering, flow control, and the conditions under which the block must make progress.",
        "A verification engineer brings a different account of what the machine owes its neighbors. A failure can expose a bad implementation, a bad check, or an unresolved architectural choice. Preserving that distinction gives experimentation a foundation. AI assistance becomes more useful when a persuasive result can be rejected for a precise, reproducible reason."
      ],
      "sourceLinks": []
    },
    {
      "chapter": 6,
      "id": "physical-design",
      "title": "Physical design: let the layout change the argument",
      "paragraphs": [
        "Expose the cells and wiring. The dataflow now occupies space, with congestion, clock distribution, power delivery, and delay. A good synthesis result can acquire costs after placement and routing that change the preferred implementation.",
        "This is another point where senior judgment should travel upstream. A physical finding may justify a local fix, a different floorplan, or a revised architectural budget. Verification and physical implementation develop in parallel as usable RTL appears. Their findings are most valuable when the people making the next decision can see the assumptions behind them. The layout belongs inside the architectural conversation."
      ],
      "sourceLinks": []
    },
    {
      "chapter": 7,
      "id": "tapeout",
      "title": "Tapeout: make the decision durable",
      "paragraphs": [
        "The exploratory freedom has a manufacturing boundary. At tapeout, intended behavior and physical implementation have to be supported by the relevant signoff evidence. Every accepted change carries obligations into the release: what was checked, under which conditions, and what other evidence the change affected.",
        "Fabrication, packaging, test, and bring-up expose the design to another kind of evidence. A model predicted behavior; hardware exhibits it. The engineer who can reconcile the two helps improve both the product and the next model. Move outward again: from layout to silicon, package to board, and board back into the tray."
      ],
      "sourceLinks": []
    },
    {
      "chapter": 8,
      "id": "rack-scale",
      "title": "Rack systems: return to the delivered machine",
      "paragraphs": [
        "Slide the tray home. The local decisions now meet traffic, other chips, scheduling, and sustained thermal conditions. Communication sits on the token path. A burst or access pattern can reveal a limitation that a steady, idealized load concealed.",
        "Etched reports rack testing in representative deployments and simulation with production-traffic patterns. Its August 2026 update announced the first rack shipment to Jane Street. These system milestones leave substantial engineering work in reliability, production, and scaling.",
        "This is the return path for an insight developed deep inside a block: did it improve the machine under the conditions that matter? That question connects the specialist’s work to the reason the system exists. Etched describes math-block designers sitting next to inference engineers. The proximity makes the system question a concrete conversation."
      ],
      "sourceLinks": [
        {
          "label": "Etched: Rack testing and engineering co-design",
          "url": "https://www.etched.com/progress/frontier-inference-clusters"
        },
        {
          "label": "Etched: From Zero to One",
          "url": "https://www.etched.com/progress/from-zero-to-one"
        }
      ]
    },
    {
      "chapter": 9,
      "id": "ai-and-coordination",
      "title": "AI tools: build a better way to decide",
      "paragraphs": [
        "An AI-native lab earns the name by changing how an engineering idea gets tested. Etched names self-improving kernel agents among the work ahead. Extending that ambition into RTL and performance analysis raises a demanding problem: give a tool useful room to search, then establish whether its proposal improves the machine.",
        "There is a serious engineering problem in deciding what these tools may change, what they must preserve, and which evidence earns trust. Experienced engineers know the failure modes that a plausible output can hide. They can help turn a search over candidates into a process that produces better decisions.",
        "Etched’s careers page emphasizes ownership and production, with openings across RTL, verification, physical design, SI/PI, and inference performance. The useful interview conversation is specific: which system decision could this role influence, who would work through the tradeoff with you, and how would you know the result improved? Bring the judgment earned from shipping difficult hardware—and the ideas you still have about how the whole machine could be better."
      ],
      "sourceLinks": [
        {
          "label": "Etched: The work ahead",
          "url": "https://www.etched.com/progress/from-zero-to-one"
        },
        {
          "label": "Etched: Engineering roles",
          "url": "https://www.etched.com/join"
        }
      ]
    }
  ]
};
