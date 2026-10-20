export const chapters = [
  {
    "id": "experience",
    "kicker": "01 / System",
    "title": "System",
    "caption": "Follow an AI request into the infrastructure that turns model computation into a stream of tokens.",
    "sceneTitle": "Start with the system",
    "sceneSubtitle": "Conceptual request → server rack → response tokens.",
    "componentIds": [
      "rack",
      "links",
      "cooling"
    ]
  },
  {
    "id": "requirements",
    "kicker": "02 / Package",
    "title": "Package",
    "caption": "Explore how compute, nearby HBM, and interfaces share a package shaped by workload requirements.",
    "sceneTitle": "Inside the accelerator package",
    "sceneSubtitle": "Compute die and HBM are distinct devices. Arrangement is illustrative.",
    "componentIds": [
      "specification",
      "package",
      "compute",
      "hbm"
    ]
  },
  {
    "id": "architecture",
    "kicker": "03 / Architecture",
    "title": "Architecture",
    "caption": "Trace data from memory through supporting functions to compute, then onward through the chip.",
    "sceneTitle": "Follow the data",
    "sceneSubtitle": "Select a block to inspect its role, inputs, outputs, and tradeoffs.",
    "componentIds": [
      "hbm",
      "buffer",
      "conversion",
      "compute",
      "control",
      "interconnect",
      "ai"
    ]
  },
  {
    "id": "quantization",
    "kicker": "04 / Quantization",
    "title": "Quantization",
    "caption": "Compare 32 values at eight and four bits: smaller payloads reduce storage, with numerical tradeoffs.",
    "sceneTitle": "One block, two representations",
    "sceneSubtitle": "32 × 8 = 256 bits → 32 × 4 = 128 bits, before scales and metadata.",
    "componentIds": [
      "conversion",
      "hbm",
      "buffer",
      "compute",
      "ai"
    ]
  },
  {
    "id": "microarchitecture",
    "kicker": "05 / Microarchitecture",
    "title": "Microarchitecture",
    "caption": "Follow an illustrative 32-bit value through registers, arithmetic, and the output interface, one clock cycle at a time.",
    "sceneTitle": "Inside the math block",
    "sceneSubtitle": "Input → register → multiply → add → output. Widths and timing are illustrative.",
    "componentIds": [
      "register",
      "multiply",
      "add",
      "interface",
      "power",
      "ai"
    ]
  },
  {
    "id": "verification",
    "kicker": "06 / Verification",
    "title": "Verification",
    "caption": "Compare observed results against independent expectations, investigate a mismatch, and test the corrected implementation.",
    "sceneTitle": "Test the intended behavior",
    "sceneSubtitle": "Specification → expected result. Testbench → observed result. Compare and retest.",
    "componentIds": [
      "testbench",
      "reference",
      "comparator",
      "specification",
      "interface",
      "ai"
    ]
  },
  {
    "id": "physical-design",
    "kicker": "07 / Physical design",
    "title": "Physical design",
    "caption": "Reveal cells, wiring, clocks, and power, then inspect the constraints that shape a realizable circuit.",
    "sceneTitle": "From logic to physical layout",
    "sceneSubtitle": "Stylized placement and routing. Physical design and verification proceed in parallel.",
    "componentIds": [
      "cells",
      "routing",
      "clock",
      "power",
      "conversion",
      "compute",
      "ai"
    ]
  },
  {
    "id": "tapeout",
    "kicker": "08 / Tapeout",
    "title": "Tapeout",
    "caption": "Follow the signed-off layout through fabrication and packaging toward tested silicon.",
    "sceneTitle": "Layout → wafer → package",
    "sceneSubtitle": "A conceptual manufacturing sequence after design signoff.",
    "componentIds": [
      "tapeout",
      "wafer",
      "package"
    ]
  },
  {
    "id": "rack-scale",
    "kicker": "09 / Rack systems",
    "title": "Rack systems",
    "caption": "Return to multiple chips, where communication, power, and cooling shape sustainable inference performance.",
    "sceneTitle": "The chip returns to the system",
    "sceneSubtitle": "Select compute, links, or cooling. Topology and traffic are illustrative.",
    "componentIds": [
      "rack",
      "links",
      "cooling",
      "hbm",
      "compute",
      "power"
    ]
  },
  {
    "id": "ai-and-coordination",
    "kicker": "10 / AI across engineering",
    "title": "AI across engineering",
    "caption": "Explore AI-assisted implementation and a proposed coordination workflow connecting requirements, code, tests, and physical findings.",
    "sceneTitle": "Connect the engineering evidence",
    "sceneSubtitle": "Explore implementation assistance and proposed feedback across teams.",
    "componentIds": [
      "ai",
      "specification",
      "compute",
      "testbench",
      "cells",
      "rack"
    ]
  }
];

export const components = {
  compute: {
    name: 'Compute / math unit', type: 'Architecture',
    description: 'Arithmetic hardware performs the operations required by the intended models. Matrix multiplication is one important operation; model execution also needs supporting functions.',
    why: 'The compute unit turns model values into results, but its useful rate depends on memory delivery and the surrounding data path.',
    inputs: 'Operands, weights, activations, and control in the required formats.',
    outputs: 'Arithmetic results for storage or the next block.',
    tradeoff: 'More arithmetic capacity helps only if memory, interfaces, timing, area, and power can support it.', chapter: 2
  },
  hbm: {
    name: 'High-bandwidth memory', type: 'Package memory',
    description: 'HBM is stacked memory associated with the compute package. It is distinct from circuitry on the compute die.',
    why: 'The model’s values require capacity, and computation requires a sufficient rate of data delivery.',
    inputs: 'Memory requests and values to be stored.', outputs: 'Requested data, including weights and intermediate values.',
    tradeoff: 'Capacity, bandwidth, access patterns, numerical format, and data movement must be considered together.', chapter: 2
  },
  buffer: {
    name: 'Buffers / on-chip storage', type: 'Architecture',
    description: 'Local storage holds data between arrival, transformation, computation, and transfer to another block.',
    why: 'Blocks do not always produce and consume data at the same instant or rate.',
    inputs: 'Values awaiting their next operation.', outputs: 'Values delivered when the consumer can accept them.',
    tradeoff: 'More buffering uses area and power; insufficient buffering can create stalls or complicate scheduling.', chapter: 2
  },
  conversion: {
    name: 'Conversion & rearrangement', type: 'Data preparation',
    description: 'Supporting functions prepare numerical representations or layouts for the next operation. Quantization, dequantization, and a matrix transpose are different examples.',
    why: 'Stored data may not already have the representation and layout the arithmetic hardware needs.',
    inputs: 'Values, format information, and any required scales or metadata.', outputs: 'Values in the required numerical representation or arrangement.',
    tradeoff: 'Conversion must maintain required numerical behavior while keeping pace with the data path.', chapter: 3
  },
  interconnect: {
    name: 'On-chip connections', type: 'Architecture',
    description: 'Connections and interfaces carry data and control between the chip’s functional blocks.',
    why: 'A fast isolated block does not make a fast system unless its neighbors can exchange work efficiently.',
    inputs: 'Data and control from producing blocks.', outputs: 'Data and control delivered to consuming blocks.',
    tradeoff: 'Widths, rates, ordering, buffering, flow control, and physical wiring must agree.', chapter: 2
  },
  control: {
    name: 'Control', type: 'Architecture',
    description: 'Control coordinates when data is valid, when operations occur, and how blocks respond to changing conditions.',
    why: 'Arithmetic and storage need a complete operating protocol, including stalls and downstream backpressure.',
    inputs: 'Operation state and interface conditions.', outputs: 'Signals coordinating computation, storage, and transfer.',
    tradeoff: 'Control must cover required situations without creating unnecessary complexity or limiting throughput.', chapter: 2
  },
  register: {
    name: 'Register', type: 'Microarchitecture',
    description: 'A register holds data across clock cycles. The example register is part of an illustrative 32-bit datapath.',
    why: 'Stored values and pipeline boundaries let the circuit organize work over time.',
    inputs: 'A value and the control required to capture it.', outputs: 'The stored value for a subsequent operation.',
    tradeoff: 'Additional registers may improve timing while increasing area, clock load, routing, latency, and power.', chapter: 4
  },
  multiply: {
    name: 'Multiplication', type: 'Microarchitecture',
    description: 'An arithmetic stage multiplies operands under the specified width and numerical rules.',
    why: 'The required mathematical behavior must become a circuit that meets the target operating rate.',
    inputs: 'Operands with defined formats and valid-data conditions.', outputs: 'A product with a specified representation.',
    tradeoff: 'Arithmetic width, pipeline organization, timing, numerical behavior, area, and power interact.', chapter: 4
  },
  add: {
    name: 'Addition', type: 'Microarchitecture',
    description: 'This illustrative stage follows multiplication. The real specification must define its operands, result width, and numerical behavior.',
    why: 'The microarchitect maps the required sequence of operations into a complete data path.',
    inputs: 'Defined operands or intermediate values.', outputs: 'A result sent onward under the interface rules.',
    tradeoff: 'Combining operations or separating them with registers changes timing, storage, latency, and physical cost.', chapter: 4
  },
  interface: {
    name: 'Block interface', type: 'Shared contract',
    description: 'The producing and receiving blocks agree on data widths, formats, ordering, accepted rates, and flow control.',
    why: 'A result only contributes to system throughput when the next block accepts and interprets it correctly.',
    inputs: 'Data, validity information, and receiving conditions.', outputs: 'Accepted transfers and any required response signals.',
    tradeoff: 'A local optimization can shift buffering, timing, or bandwidth demands onto the neighboring block.', chapter: 4
  },
  testbench: {
    name: 'Testbench', type: 'Design verification',
    description: 'The verification environment drives scenarios, observes the implementation, and checks required behavior.',
    why: 'Finding a bug before fabrication avoids carrying that error into manufactured silicon.',
    inputs: 'Architectural requirements, test scenarios, and the implementation under test.', outputs: 'Observed behavior, checks, coverage, and reproducible failures.',
    tradeoff: 'Reusable frameworks help organize tests; meaningful scenarios and expectations remain design-specific.', chapter: 5
  },
  reference: {
    name: 'Independent reference', type: 'Architectural intent',
    description: 'Expected behavior comes from an independent understanding of the specification, including numerical and interface requirements.',
    why: 'Expectations copied entirely from RTL can repeat an incorrect implementation assumption.',
    inputs: 'Specified behavior and the test’s input conditions.', outputs: 'The result or behavior the implementation should produce.',
    tradeoff: 'An unclear specification needs architectural resolution rather than an arbitrary test expectation.', chapter: 5
  },
  comparator: {
    name: 'Result comparison', type: 'Verification evidence',
    description: 'A check compares expected and observed behavior under the relevant conditions.',
    why: 'A mismatch gives engineers a concrete disagreement to investigate together.',
    inputs: 'Expected results and implementation observations.', outputs: 'Agreement or a failure with context for investigation.',
    tradeoff: 'A failure may reveal an RTL bug, a test issue, or an ambiguous requirement; its cause must be established.', chapter: 5
  },
  cells: {
    name: 'Cells & placement', type: 'Physical design',
    description: 'Synthesis maps RTL into circuit cells and connections. Physical implementation places those cells on the die.',
    why: 'Logical behavior needs a realizable physical arrangement of transistor-based circuits.',
    inputs: 'A synthesized netlist, floorplan, and implementation constraints.', outputs: 'Placed cells and physical analysis.',
    tradeoff: 'Local density and placement affect routing, timing, area use, and power. The view here is stylized.', chapter: 6
  },
  routing: {
    name: 'Routing', type: 'Physical design',
    description: 'Physical wiring connects the circuit’s cells and blocks while meeting implementation and manufacturing constraints.',
    why: 'Connections consume physical resources and contribute to the circuit’s timing and power.',
    inputs: 'Required connections and placed circuit elements.', outputs: 'Routed connections and analysis of the resulting implementation.',
    tradeoff: 'Congestion or a long path may require moving a block or changing its organization.', chapter: 6
  },
  clock: {
    name: 'Clock distribution', type: 'Physical design',
    description: 'Clock distribution reaches the storage elements that coordinate state transitions across cycles.',
    why: 'The cycle-by-cycle behavior described in RTL needs a physical timing framework.',
    inputs: 'Clock requirements and the circuit’s storage elements.', outputs: 'An implemented clock distribution network.',
    tradeoff: 'Clocking, register placement, routing, timing, and power must be evaluated together.', chapter: 6
  },
  power: {
    name: 'Power delivery & budget', type: 'A system constraint',
    description: 'Power is a design constraint from RTL decisions through physical implementation and rack operation.',
    why: 'The system must supply energy and remove heat while silicon remains within operating limits.',
    inputs: 'Circuit activity and requirements for operating voltage and frequency.', outputs: 'Power analysis and a realizable delivery plan.',
    tradeoff: 'Storage, switching, wiring, clocks, memory activity, and leakage all contribute; logic count alone is insufficient.', chapter: 6
  },
  rack: {
    name: 'Server rack', type: 'Inference system',
    description: 'The rack brings compute, memory, communication, power delivery, and cooling into an operating system.',
    why: 'The workload is served by the complete deployment rather than a chip in isolation.',
    inputs: 'Workloads, software, electrical power, and the required operating environment.', outputs: 'Sustained inference performance under defined conditions.',
    tradeoff: 'Capacity, interconnect, thermal limits, reliability, and economics all shape useful operation.', chapter: 8
  },
  cooling: {
    name: 'Cooling', type: 'Rack engineering',
    description: 'Cooling removes heat generated by the system so that hardware can remain within operating limits.',
    why: 'The performance target needs to be sustainable when many chips operate together.',
    inputs: 'Heat from active system components.', outputs: 'Heat removal within the deployment’s thermal design.',
    tradeoff: 'Thermal capacity and operating cost constrain the performance the system can maintain.', chapter: 8
  },
  links: {
    name: 'Chip-to-chip communication', type: 'System interconnect',
    description: 'Communication moves data when a model or its execution spans multiple devices.',
    why: 'A token’s generation path can depend on results arriving from another chip.',
    inputs: 'Distributed-workload traffic and the selected communication configuration.', outputs: 'Data delivered with the path’s effective bandwidth and latency.',
    tradeoff: 'Topology, protocols, contention, electronics, and traffic matter alongside medium and distance.', chapter: 8
  },
  tapeout: {
    name: 'Tapeout release', type: 'Manufacturing handoff',
    description: 'After checks and signoff, the completed physical layout and required manufacturing data are released to the foundry.',
    why: 'Fabrication needs the detailed design that can be manufactured.',
    inputs: 'Signed-off implementation and manufacturing deliverables.', outputs: 'A release that commonly includes a GDSII or OASIS layout database.',
    tradeoff: 'A serious error discovered after fabrication may require design changes and another tapeout.', chapter: 7
  },
  wafer: {
    name: 'Fabricated silicon', type: 'Manufacturing',
    description: 'Fabrication realizes the released circuit design on silicon. This wafer is a conceptual illustration.',
    why: 'The design must become physical hardware before post-silicon behavior can be evaluated.',
    inputs: 'The released design and manufacturing process.', outputs: 'Fabricated devices for subsequent product stages.',
    tradeoff: 'Design evidence precedes manufacturing; testing and validation must also establish real silicon behavior.', chapter: 7
  },
  package: {
    name: 'Accelerator package', type: 'From die to system',
    description: 'Packaging connects fabricated devices into the intended package. HBM stacks are distinct from the compute die.',
    why: 'The compute die needs its memory and external connections as part of the larger system.',
    inputs: 'Fabricated devices and the package design.', outputs: 'Packaged hardware for test, bring-up, and system integration.',
    tradeoff: 'This conceptual diagram explains roles; it does not reveal an actual Etched package arrangement.', chapter: 7
  },
  ai: {
    name: 'AI-assisted engineering', type: 'Exploration & coordination',
    description: 'The interview describes a focus on AI assistance for RTL and performance analysis. Connecting cross-team evidence is a further opportunity.',
    why: 'Candidate implementations and relevant findings can be easier to explore when their context is explicit.',
    inputs: 'Requirements, RTL, analysis, tests, and engineering context.', outputs: 'Proposals or organized evidence for engineers to evaluate.',
    tradeoff: 'Changes still require relevant functional, performance, and physical checks; verification must retain independent intent.', chapter: 9
  },
  specification: {
    name: 'Architectural specification', type: 'The shared intent',
    description: 'The specification defines block responsibilities, interfaces, required behavior, and applicable budgets.',
    why: 'Designers, verifiers, performance modelers, and physical engineers need a shared statement of the goal.',
    inputs: 'Workload needs, system goals, and architectural analysis.', outputs: 'Requirements that implementation and independent checks can use.',
    tradeoff: 'Ambiguities and changing assumptions need explicit feedback rather than separate interpretations.', chapter: 1
  }
};

export const sources = [
  { label: 'Etched · Chips, racks, software, and manufacturing', url: 'https://www.etched.com/' },
  { label: 'NVIDIA · LLM inference benchmarking terminology', url: 'https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/' },
  { label: 'NVIDIA cuDNN · Block scaling formats', url: 'https://docs.nvidia.com/cudnn/operations/BlockScaling/' },
  { label: 'NVIDIA TensorRT · Quantization and dequantization', url: 'https://docs.nvidia.com/deeplearning/tensorrt/latest/inference-library/quantized-types-schemes.html' },
  { label: 'Accellera · Universal Verification Methodology', url: 'https://www.accellera.org/community/uvm' },
  { label: 'Synopsys · Low-power design', url: 'https://www.synopsys.com/glossary/what-is-low-power-design.html' },
  { label: 'Cadence · The RTL-to-GDSII implementation flow', url: 'https://community.cadence.com/cadence_blogs_8/b/di/posts/training-insights---rtl-to-gdsii-creativity-meets-engineering-in-chip-design' },
  { label: 'TSMC · RTL-through-GDSII design flow', url: 'https://pr.tsmc.com/english/news/1547' }
];
