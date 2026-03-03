import { LucideIcon, Users, Brain, Vote, Languages, Calculator, Globe, BookOpen } from 'lucide-react';

export type CategoryId = 'sociology' | 'psychology' | 'political_science' | 'linguistics' | 'math_info' | 'anthropology' | 'literature';

export interface Concept {
  id: string;
  term: string;
  definition: string;
  origin: CategoryId;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: any; // Using any for Lucide icon component type for simplicity in data file
  color: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'sociology',
    name: '社会学',
    icon: Users,
    color: 'bg-blue-500',
    description: '研究社会结构、互动与关系的学科'
  },
  {
    id: 'psychology',
    name: '心理学',
    icon: Brain,
    color: 'bg-pink-500',
    description: '研究心理过程与行为的学科'
  },
  {
    id: 'political_science',
    name: '政治学',
    icon: Vote,
    color: 'bg-red-600',
    description: '研究权力、政府与公共政策的学科'
  },
  {
    id: 'linguistics',
    name: '语言学与符号学',
    icon: Languages,
    color: 'bg-purple-500',
    description: '研究语言结构、意义与符号系统的学科'
  },
  {
    id: 'math_info',
    name: '数学与信息科学',
    icon: Calculator,
    color: 'bg-cyan-600',
    description: '研究数量、结构、信息处理与传输的学科'
  },
  {
    id: 'anthropology',
    name: '人类学',
    icon: Globe,
    color: 'bg-amber-600',
    description: '研究人类文化、习俗与演化的学科'
  },
  {
    id: 'literature',
    name: '文学',
    icon: BookOpen,
    color: 'bg-emerald-600',
    description: '研究文本、叙事与修辞的学科'
  }
];

export const CONCEPTS: Concept[] = [
  // Sociology (社会学)
  { id: '1', term: '社会资本 (Social Capital)', definition: '个人或群体通过社会关系网络获得的资源。', origin: 'sociology' },
  { id: '2', term: '符号互动论 (Symbolic Interactionism)', definition: '人们通过符号（如语言、手势）进行互动并构建社会现实。', origin: 'sociology' },
  { id: '3', term: '创新扩散 (Diffusion of Innovations)', definition: '新观念或技术如何随时间在社会系统中传播。', origin: 'sociology' },
  { id: '4', term: '框架分析 (Frame Analysis)', definition: '人们如何组织经验并赋予事件意义的认知结构。', origin: 'sociology' },
  { id: '5', term: '公共领域 (Public Sphere)', definition: '私人个体聚集在一起讨论公共事务的领域（哈贝马斯）。', origin: 'sociology' },
  { id: '6', term: '社会网络分析 (Social Network Analysis)', definition: '研究社会结构中的节点（行动者）与连边（关系）。', origin: 'sociology' },
  { id: '7', term: '刻板印象 (Stereotype)', definition: '对特定群体成员的概括性看法（李普曼）。', origin: 'sociology' }, // Also psych, but Lippmann (Public Opinion) is often tied to soc/pol roots here.
  { id: '8', term: '把关人 (Gatekeeping)', definition: '决定哪些信息可以通过渠道进入系统的过程（库尔特·勒温）。', origin: 'sociology' }, // Lewin is psych, but concept heavily used in soc contexts of orgs. Let's stick to Soc for the "Social Psychology" overlap or keep it distinct. Actually Lewin is Social Psych. Let's put it in Psychology to be precise, or Sociology if we consider the institutional application. Let's go with Sociology/Social Psych overlap, but usually categorized under Social Psychology in origins. Wait, let's put it in Psychology to be safe, or Sociology for the "Group Dynamics". Let's use "Sociology" for the "Group Dynamics" aspect in this game context as it's often taught alongside organizational soc. Actually, let's stick to Psychology for Lewin.
  // Re-evaluating Gatekeeping: Lewin was a psychologist. Let's move to Psych.
  
  // Psychology (心理学)
  { id: '9', term: '认知失调 (Cognitive Dissonance)', definition: '当态度与行为不一致时产生的心理不适感。', origin: 'psychology' },
  { id: '10', term: '详尽可能性模型 (ELM)', definition: '解释人们在处理说服信息时采取中心路径还是边缘路径。', origin: 'psychology' },
  { id: '11', term: '社会学习理论 (Social Learning Theory)', definition: '通过观察他人的行为及其后果来学习（班杜拉）。', origin: 'psychology' },
  { id: '12', term: '启动效应 (Priming)', definition: '先前的刺激会影响对后续刺激的加工和反应。', origin: 'psychology' },
  { id: '13', term: '归因理论 (Attribution Theory)', definition: '人们如何解释自己或他人行为的原因。', origin: 'psychology' },
  { id: '14', term: '群体思维 (Groupthink)', definition: '群体为追求和谐一致而忽视客观评估替代方案。', origin: 'psychology' },
  { id: '15', term: '把关人 (Gatekeeping)', definition: '群体动力学中决定信息流动的关键人物（勒温）。', origin: 'psychology' }, // Moved here.
  { id: '16', term: '自我效能感 (Self-Efficacy)', definition: '个体对自己完成特定任务能力的信念。', origin: 'psychology' },
  { id: '17', term: '选择性接触 (Selective Exposure)', definition: '倾向于接触与自己既有观点一致的信息。', origin: 'psychology' },

  // Political Science (政治学)
  { id: '18', term: '议程设置 (Agenda Setting)', definition: '媒体不决定人们怎么想，但决定人们想什么（源于公众舆论研究）。', origin: 'political_science' },
  { id: '19', term: '沉默的螺旋 (Spiral of Silence)', definition: '当个人感知到自己的观点是少数派时，倾向于保持沉默。', origin: 'political_science' }, // Noelle-Neumann was a pol scientist/pollster.
  { id: '20', term: '霸权 (Hegemony)', definition: '统治阶级通过文化和意识形态手段维持其领导地位（葛兰西）。', origin: 'political_science' },
  { id: '21', term: '意识形态 (Ideology)', definition: '一套反映特定阶级利益的观念体系。', origin: 'political_science' },
  { id: '22', term: '软实力 (Soft Power)', definition: '通过吸引力而非强制力来达到目标的能力。', origin: 'political_science' },
  { id: '23', term: '宣传 (Propaganda)', definition: '为影响公众态度而进行的有系统的传播活动。', origin: 'political_science' },

  // Linguistics & Semiotics (语言学与符号学)
  { id: '24', term: '能指/所指 (Signifier/Signified)', definition: '符号的物质形式（声音/图像）与它所代表的概念。', origin: 'linguistics' },
  { id: '25', term: '言语行为理论 (Speech Act Theory)', definition: '说话本身就是一种行动（如承诺、命令）。', origin: 'linguistics' },
  { id: '26', term: '话语分析 (Discourse Analysis)', definition: '研究语言在社会语境中的使用及其权力关系。', origin: 'linguistics' },
  { id: '27', term: '语码转换 (Code Switching)', definition: '在对话中交替使用两种或多种语言或语言变体。', origin: 'linguistics' },
  { id: '28', term: '结构主义 (Structuralism)', definition: '分析文化系统中的深层结构和二元对立。', origin: 'linguistics' },
  { id: '29', term: '符号学 (Semiotics)', definition: '研究符号及其意义生成过程的学科。', origin: 'linguistics' },

  // Math & Info Science (数学与信息科学)
  { id: '30', term: '信息论 (Information Theory)', definition: '关于信息的量化、存储和通信的数学理论（香农）。', origin: 'math_info' },
  { id: '31', term: '控制论 (Cybernetics)', definition: '研究动物和机器中的控制与通信（维纳）。', origin: 'math_info' },
  { id: '32', term: '熵 (Entropy)', definition: '衡量系统无序程度或信息不确定性的指标。', origin: 'math_info' },
  { id: '33', term: '信噪比 (Signal-to-Noise Ratio)', definition: '有用信号功率与噪声功率的比值。', origin: 'math_info' },
  { id: '34', term: '反馈 (Feedback)', definition: '系统输出的一部分返回到输入端，以调节系统行为。', origin: 'math_info' },

  // Anthropology (人类学)
  { id: '35', term: '民族志 (Ethnography)', definition: '通过实地考察深入描述特定文化群体的研究方法。', origin: 'anthropology' },
  { id: '36', term: '深描 (Thick Description)', definition: '不仅描述行为本身，还解释行为背后的文化语境和意义。', origin: 'anthropology' },
  { id: '37', term: '仪式 (Ritual)', definition: '具有象征意义的、重复性的行为模式。', origin: 'anthropology' },
  { id: '38', term: '阈限 (Liminality)', definition: '仪式过程中处于“之间”的过渡状态。', origin: 'anthropology' },

  // Literature (文学)
  { id: '39', term: '叙事学 (Narratology)', definition: '研究叙事结构、功能和运作机制的理论。', origin: 'literature' },
  { id: '40', term: '修辞学 (Rhetoric)', definition: '研究说服的艺术，特别是语言在论辩中的使用（源于古希腊）。', origin: 'literature' } // Often shared, but strong lit roots.
];
