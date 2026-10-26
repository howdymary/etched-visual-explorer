export const essay = {
  title: 'A Faster Way to Find Out',
  deck: 'Designing an inference system means following a decision from the math block to the rack—and bringing the evidence back.',
  kicker: 'Engineering / Inference systems',
  introduction: [
    'Years spent shipping silicon teach a particular kind of judgment: recognizing when an improvement has moved the problem somewhere else. A pipeline change closes timing and changes buffering. A denser implementation creates a routing problem. An arithmetic optimization leaves the workload waiting on memory. The interesting question is how quickly the engineer can see those consequences and act on them.',
    'Inference makes that question span the entire system. Workload behavior, numerical choices, circuits, packaging, communication, and cooling meet in the time and energy required to produce an answer. This walkthrough follows those connections. The opportunity is to give experienced judgment better evidence and greater reach.'
  ],
  sections: [
    {
      chapter: 0,
      id: 'experience',
      title: 'System: begin with the inference workload',
      paragraphs: [
        'A performance target begins with a workload and an operating boundary. Model, precision, context length, request mix, concurrency, and latency requirements determine which resources matter. Aggregate throughput can improve while an interactive request becomes slower. A credible system model keeps those outcomes visible together.',
        'Etched publicly describes co-design across chips, racks, software, and manufacturing. That scope makes a useful engineering question possible: which assumption connects a local decision to the delivered service? Following it may lead from arithmetic utilization to memory traffic, scheduling, or power. The first task is to identify the limiting resource and the evidence that could show the diagnosis is wrong.'
      ],
      sourceLinks: [
        { label: 'Etched: Frontier Inference Clusters', url: 'https://www.etched.com/progress/frontier-inference-clusters' }
      ]
    },
    {
      chapter: 1,
      id: 'requirements',
      title: 'Package: make data delivery physically plausible',
      paragraphs: [
        'The package turns a dataflow assumption into a physical commitment. Memory capacity and bandwidth must coexist with signal paths, power delivery, thermals, manufacturing constraints, and the connections needed outside the package. A capacity calculation alone cannot establish that the intended workload will keep the compute resources fed.',
        'In the illustration, compute and HBM appear as distinct devices. Their arrangement explains a relationship rather than a product layout. The useful exercise is to trace a demand across that boundary: which data arrives, at what sustained rate, and under which access pattern? Then ask what happens to timing, power, and implementation when that demand changes. Package choices deserve a place in the performance argument early.'
      ],
      sourceLinks: []
    },
    {
      chapter: 2,
      id: 'architecture',
      title: 'Architecture: expose the assumptions between blocks',
      paragraphs: [
        'A block diagram is also a set of claims about rates, representations, storage, and coordination. An arithmetic target assumes operands arrive. A memory target assumes useful access patterns. An interface assumes its producer and consumer agree about ordering and backpressure. The architecture becomes more credible as those claims become explicit and testable.',
        'Follow a value through the illustrated memory, buffering, conversion, compute, and communication paths. The question at each boundary is whether the neighboring block can sustain the behavior the model assumes. When an assumption fails, the team needs room to revise the boundary itself. The evidence may call for a different interface, a new allocation of storage, or a different division of work. That is where deep block knowledge reaches into the system.'
      ],
      sourceLinks: []
    },
    {
      chapter: 3,
      id: 'quantization',
      title: 'Quantization: account for the whole representation',
      paragraphs: [
        'Lower precision changes more than arithmetic density. Scales, grouping, conversion, data layout, accumulation, and numerical error all affect whether a representation produces a useful system improvement. A smaller payload can shift work into another part of the path. Model quality and serving performance need evaluation under the same intended conditions.',
        'The eight-bit and four-bit views isolate the raw-payload difference. They leave metadata and implementation costs to be accounted for separately. An engineer evaluating the change should ask where conversion occurs, what rate it must sustain, and whether the consumer can exploit the result. The accepted representation has to satisfy both numerical requirements and the physical data path that carries it.'
      ],
      sourceLinks: []
    },
    {
      chapter: 4,
      id: 'microarchitecture',
      title: 'Microarchitecture: follow a local change into its neighbors',
      paragraphs: [
        'A pipeline decision changes the contract around an operation. Additional stages may improve achievable frequency while adding latency, clock load, storage, and flow-control obligations. Reducing registers may save one resource while making a path harder to implement. The relevant comparison is between complete implementations under the required operating conditions.',
        'The illustrated datapath is deliberately small enough to inspect. Its input, arithmetic, storage, and output still raise real questions: what happens during a stall, which values must remain live, and can the next block accept the result? A candidate RTL change earns its place through the behavior and implementation it produces. Source-code brevity offers little evidence by itself.'
      ],
      sourceLinks: []
    },
    {
      chapter: 5,
      id: 'verification',
      title: 'Verification: preserve an independent account of intent',
      paragraphs: [
        'Verification needs a reason to expect an answer that is independent of the implementation being checked. That includes numerical behavior, sequencing, interfaces, and the circumstances in which progress is required. Copying an implementation assumption into a reference model can make two artifacts agree on the same mistake.',
        'This matters when AI proposes code or tests. A plausible candidate and a matching generated test are the beginning of an investigation. Requirements, independent checks, adversarial cases, and coverage determine what has actually been established. When a failure appears, the valuable output is a reproducible disagreement with enough context to distinguish an implementation defect, a checking defect, and an ambiguous specification.'
      ],
      sourceLinks: []
    },
    {
      chapter: 6,
      id: 'physical-design',
      title: 'Physical design: bring the implementation evidence back',
      paragraphs: [
        'Timing, congestion, clock distribution, power delivery, and routing turn architectural expectations into constraints that can disagree with them. A synthesis result is evidence about one stage. Placement and routing can expose costs that were hidden in an apparently attractive logical organization.',
        'The conceptual layout lets those constraints become visible. The engineering loop closes when the relevant finding reaches someone who can revise the RTL, the floorplan, or the architectural budget. Verification and physical implementation develop alongside usable RTL, feeding different evidence into that decision. An optimization needs an explicit record of the stage measured, the constraints used, and the downstream work required to establish a system benefit.'
      ],
      sourceLinks: []
    },
    {
      chapter: 7,
      id: 'tapeout',
      title: 'Tapeout: make the evidence survive the handoff',
      paragraphs: [
        'Tapeout concentrates the consequences of earlier decisions into a manufacturing release. The work leading to it has to establish agreement among intended behavior, implemented circuits, and the applicable physical and manufacturing checks. Changes near that boundary require a clear account of what was re-evaluated and why the evidence remains valid.',
        'Fabrication and packaging then turn the released design into hardware that can be tested. Bring-up and system validation ask questions that pre-silicon models could only estimate. The connection back matters: observations from real hardware should help engineers locate which assumption, model, or implementation needs attention. The wafer-to-package sequence in the walkthrough illustrates those stages without presenting a product schedule.'
      ],
      sourceLinks: []
    },
    {
      chapter: 8,
      id: 'rack-scale',
      title: 'Rack systems: evaluate the sustained result',
      paragraphs: [
        'A distributed workload puts communication on the token path. Effective bandwidth, latency, contention, placement, and scheduling influence how much of the compute capability becomes useful service. Power delivery and heat removal determine whether that result is sustainable. The comparison has to include the complete path and the conditions under which it operates.',
        'Etched reports testing racks in representative data center deployments and simulating production-traffic patterns. The architectural question is which traffic characteristic changes a decision: an arrival pattern, a burst of communication, or a memory access pattern that an idealized workload concealed. Simulation, customer testing, and sustained deployment measurements answer different questions. Keeping those boundaries explicit makes the engineering result more persuasive to someone who has had to reconcile all three.'
      ],
      sourceLinks: [
        { label: 'Etched: Frontier Inference Clusters', url: 'https://www.etched.com/progress/frontier-inference-clusters' }
      ]
    },
    {
      chapter: 9,
      id: 'ai-and-coordination',
      title: 'AI tools: shorten the path to trustworthy evidence',
      paragraphs: [
        'AI assistance in RTL optimization and performance analysis creates a practical question: how much more design space can an engineer evaluate with evidence they can trust? Etched’s August 2026 update names self-improving kernel agents among the challenges ahead. For silicon work, the useful test is whether assistance improves a decision while preserving independent verification and physical constraints.',
        'The technical opportunity is substantial: define useful search spaces, expose constraints, produce reproducible evidence, and reject attractive changes that fail elsewhere. An experienced engineer can help determine what a tool may change, what it must preserve, and which result deserves trust. An AI-native engineering environment should make that judgment more effective. Demonstrating the loop on a real decision is the work that makes the promise credible.'
      ],
      sourceLinks: [
        { label: 'Etched: From Zero to One', url: 'https://www.etched.com/progress/from-zero-to-one' }
      ]
    }
  ]
};
