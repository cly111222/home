export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const blogCategories = {
  'React': {
    name: 'React 技术',
    description: 'React 相关的深度技术文章，包括原理解析、最佳实践等'
  },
  'Project': {
    name: '项目实战',
    description: '实际项目开发中的经验总结和最佳实践'
  },
  'Architecture': {
    name: '架构设计',
    description: '前端架构设计、技术选型和系统设计相关文章'
  },
  'Performance': {
    name: '性能优化',
    description: '前端性能优化相关的技术文章和实践经验'
  },
  'Learning': {
    name: '学习笔记',
    description: '技术学习过程中的笔记和心得体会'
  },
  'Career': {
    name: '职业发展',
    description: '前端职业发展相关的思考和经验分享'
  }
};

export const blogTags = [
  'React',
  'TypeScript',
  'Next.js',
  'Performance',
  'Architecture',
  'Best Practices',
  'Project Experience',
  'Learning Notes',
  'Career Growth',
  'Technical Thinking'
];

export const blogPosts: BlogPost[] = [
  {
    id: 'vue-reactivity',
    title: 'Vue响应式原理与生命周期详解',
    date: '2024-01-24',
    category: '前端开发',
    tags: ['Vue', '响应式原理', '生命周期'],
    excerpt: '深入解析Vue的响应式系统实现原理和组件生命周期，包括数据劫持、依赖收集、虚拟DOM和diff算法等核心概念。',
    content: `
# Vue响应式原理与生命周期详解

## 响应式系统工作流程

Vue 的响应式系统是其最核心的特性之一，让我们通过一个完整的流程图来了解它是如何工作的：

\`\`\`mermaid
graph TD
    A[new Vue()] --> B[_init()初始化]
    B --> C[初始化生命周期]
    B --> D[初始化事件系统]
    B --> E[初始化data/props]
    E --> F[Object.defineProperty]
    F --> G[数据响应式处理]
    G --> H[getter/setter]
    A --> I[$mount挂载]
    I --> J[compile编译]
    J --> K[parse解析]
    K --> L[生成AST树]
    J --> M[optimize优化]
    M --> N[标记静态节点]
    J --> O[generate生成]
    O --> P[render函数]
    P --> Q[生成虚拟DOM]
    Q --> R[触发getter]
    R --> S[依赖收集Dep]
    T[数据更新] --> U[触发setter]
    U --> V[通知Watcher]
    V --> W[update更新]
    W --> X[patch修补]
    X --> Y[diff对比]
    Y --> Z[更新DOM]
\`\`\`

## 详细流程说明

### 1. 初始化阶段
- 执行 \`_init()\` 初始化函数
- 初始化生命周期、事件系统
- 初始化 data、props、computed、watch 等数据
- 初始化各种内部属性和方法

### 2. 响应式处理
- 通过 \`Object.defineProperty\` 对数据进行响应式处理
- 为每个属性设置 getter/setter
- getter 用于依赖收集
- setter 用于派发更新

### 3. 模板编译
- 执行 \`$mount\` 进入挂载阶段
- compile 编译器处理 template
- parse 解析器生成 AST 抽象语法树
- optimize 优化器添加静态标记
- generate 生成器生成 render 函数

### 4. 依赖收集
- 执行 render 函数时访问数据
- 触发 getter 进行依赖收集
- 将当前 Watcher 订阅到数据的 Dep 中
- 建立数据与视图的对应关系

### 5. 更新机制
- 数据变化触发 setter
- setter 通知 Dep 中的所有 Watcher
- Watcher 调用 update 进行更新
- 生成新的虚拟 DOM 树

### 6. 差异更新
- patch 函数对比新旧虚拟 DOM
- diff 算法找出最小差异
- 只更新变化的部分到真实 DOM
- 提高更新效率

## 核心代码实现

### 响应式系统
\`\`\`javascript
function defineReactive(obj, key, val) {
  // 创建依赖收集器
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 派发更新
      dep.notify()
    }
  })
}
\`\`\`

### 编译系统
\`\`\`javascript
// 编译过程
function compile(template) {
  // 1. parse - 将模板解析为AST
  const ast = parse(template)
  
  // 2. optimize - 优化AST，标记静态节点
  optimize(ast)
  
  // 3. generate - 生成渲染函数
  const code = generate(ast)
  return code
}
\`\`\`

### 虚拟DOM
\`\`\`javascript
// VNode节点
class VNode {
  constructor(tag, data, children, text) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
  }
}

// patch过程
function patch(oldVnode, vnode) {
  // 对比节点
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  } else {
    // 替换节点
    const oldElm = oldVnode.elm
    const parentElm = oldElm.parentNode
    createElm(vnode)
    parentElm.insertBefore(vnode.elm, oldElm)
    parentElm.removeChild(oldElm)
  }
}
\`\`\`

## 生命周期钩子

Vue 组件的生命周期钩子按照执行顺序：

1. beforeCreate: 实例初始化之后，数据观测和事件配置之前
2. created: 实例创建完成，数据观测和事件配置完成
3. beforeMount: 挂载开始之前被调用
4. mounted: 实例挂载完成
5. beforeUpdate: 数据更新时调用
6. updated: 数据更新完成后调用
7. beforeDestroy: 实例销毁之前调用
8. destroyed: 实例销毁后调用

## 最佳实践

在使用 Vue 进行开发时，应该注意以下几点：

1. **合理设计数据结构**
   - 避免深层嵌套的响应式数据
   - 使用扁平化的数据结构
   - 合理使用计算属性和监听器

2. **优化性能**
   - 使用 v-show 代替频繁切换的 v-if
   - 为列表渲染添加 key
   - 避免同时修改多个响应式属性
   - 使用异步组件和路由懒加载

3. **生命周期使用建议**
   - created: 适合进行数据初始化
   - mounted: 适合进行DOM操作和第三方库初始化
   - beforeDestroy: 适合清理定时器和事件监听

4. **响应式系统注意事项**
   - 提前声明响应式属性
   - 使用 Vue.set 添加新属性
   - 避免直接修改数组索引和长度

## 总结

Vue 的响应式系统是其核心特性，通过数据劫持和发布订阅模式实现了数据与视图的自动同步。整个过程可以概括为：

1. 初始化数据响应式
2. 编译模板为渲染函数
3. 收集视图依赖
4. 数据变化触发更新
5. 虚拟DOM差异更新

理解这个完整的流程对于深入使用 Vue 和优化应用性能都很有帮助。在实际开发中，我们应该：

1. 合理设计数据结构
2. 避免不必要的响应式数据
3. 利用好虚拟DOM的优化机制
4. 正确使用生命周期钩子

## 参考资料

1. [Vue.js 官方文档](https://cn.vuejs.org/guide/introduction.html)
2. [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
3. [深入浅出 Vue.js](https://book.douban.com/subject/32581281/)
    `
  },
  {
    id: 'design-patterns',
    title: 'JavaScript设计模式实践：单例、观察者与发布订阅',
    date: '2024-01-22',
    category: '前端开发',
    tags: ['JavaScript', '设计模式', '最佳实践'],
    excerpt: '深入探讨JavaScript中常用的设计模式实现，包括单例模式、观察者模式和发布订阅模式的实现原理和应用场景。',
    content: `
# JavaScript设计模式实践：单例、观察者与发布订阅

## 单例模式（Singleton Pattern）

单例模式确保一个类只有一个实例，并提供一个访问它的全局访问点。这在需要统一管理状态或资源时非常有用。

### 实现原理

\`\`\`javascript
class Singleton {
  constructor(name) {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    this.name = name;
    return Singleton.instance;
  }
}
\`\`\`

### 应用场景

1. 全局状态管理（如 Redux store）
2. 全局配置对象
3. 数据库连接池
4. 日志记录器

## 观察者模式（Observer Pattern）

观察者模式定义了对象间的一对多依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

### 使用Proxy实现

\`\`\`javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);

const observable = obj => new Proxy(obj, {
    set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        queuedObservers.forEach(observer => observer());
        return result;
    }
});
\`\`\`

### 应用场景

1. 数据绑定（如Vue的响应式系统）
2. DOM事件处理
3. 用户界面更新

## 发布订阅模式（Publish-Subscribe Pattern）

发布订阅模式是一种消息范式，发布者不会直接将消息发送给特定的订阅者，而是通过一个事件中心来管理消��的发布和订阅。

### 实现示例

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
\`\`\`

### 应用场景

1. 跨组件通信
2. 事件驱动的应用
3. 消息队列系统

## 最佳实践

1. **选择合适的模式**
   - 单例模式：适合全局状态管理
   - 观察者模式：适合简单的场景，如UI更新
   - 发布订阅：适合复杂的场景，如跨组件通信

2. **注意性能影响**
   - 避免过多的观察者
   - 及时清理不需要的订阅
   - 合理使用内存

3. **错误处理**
   - 添加错误边界
   - 处理异步操作
   - 避免内存泄漏

## 总结

设计模式是解决常见问题的最佳实践，合理使用可以提高代码的可维护性和可扩展性。在实际应用中，应根据具体场景选择合适的模式，并注意避免过度设计。
    `
  },
  {
    id: 'js-number-precision',
    title: 'JavaScript浮点数计算精度问题及解决方案',
    date: '2024-01-21',
    category: '前端开发',
    tags: ['JavaScript', '数值计算', '最佳实践'],
    excerpt: '详细分析JavaScript中浮点数计算精度问题的原因，并提供多种实用的解决方案和最佳实践。',
    content: `
# JavaScript浮点数计算精度问题及解决方案

## 问题描述

在JavaScript中进行浮点数计算时，经常会遇到精度问题：

\`\`\`javascript
let percentage = 33.33;
let total = 100;
console.log(percentage / total); // 输出: 0.3333333333333333
\`\`\`

这是因为JavaScript使用IEEE 754标准的双精度浮点数来表示数字，在进行二进制转换时会产生精度损失。

## 解决方案流程

\`\`\`
[输入数值] -> [判断是否需要精确计算]
                |
                +-> [否] -> [直接计算] ----+
                |                          |
                +-> [是] -> [确定精度要求] |
                           |               |
                           v               |
                    [选择处理方案]         |
                           |               |
            +----+----+----+              |
            |    |    |                   |
            v    v    v                   |
        [方案1][方案2][方案3]             |
            |    |    |                   |
            v    v    v                   |
    [放大数字][分离][使用库]              |
            |    |    |                   |
            v    v    v                   |
        [处理][计算][调用]                |
            |    |    |                   |
            +----+----+                   |
                 |                        |
                 v                        |
            [最终结果] <-----------------+
\`\`\`

## 解决方案

### 1. 使用Math.floor和toFixed组合

这种方法通过先放大数字，然后向下取整，最后再缩小来保证精度：

\`\`\`javascript
function formatNumber(num, precision = 2) {
    const multiplier = Math.pow(10, precision);
    const numStr = Number(num * multiplier).toFixed(2);
    return (Math.floor(Number(numStr)) / multiplier).toFixed(precision);
}

// 使用示例
let allBeforeSalary = 22.33;
allBeforeSalary = formatNumber(allBeforeSalary * 100); // 2233.00
\`\`\`

### 2. 分离整数和小数部分

通过分别处理整数和小数部分来提高精度：

\`\`\`javascript
function formatCurrency(num) {
    num = Math.floor(num * 100 + 0.50000000001);
    const cents = num % 100;
    const dollars = Math.floor(num / 100).toString();
    return dollars + '.' + (cents < 10 ? '0' : '') + cents;
}

// 使用示例
console.log(formatCurrency(22.33)); // "22.33"
\`\`\`

## 最佳实践

1. **统一精度处理**
\`\`\`javascript
const formatAmount = (amount, precision = 2) => {
    const multiplier = Math.pow(10, precision);
    return (Math.floor(Number(amount * multiplier).toFixed(precision)) / multiplier).toFixed(precision);
};
\`\`\`

## 注意事项

1. 在进行金额计算时，始终使用统一的精度处理方法
2. 对于需要展示的金额，使用toFixed()进行格式化
3. 在进行中间计算时，保持更高的精度，最后再格式化
4. 考虑使用专门的数学库处理特别重要的计算

## 总结

JavaScript浮点数精度问题是由IEEE 754标准决定的，虽然无法完全避免，但通过合适的处理方法可以满足大多数业务场景的需求。选择合适的解决方案时，需要在精度、性能和可维护性之间找到平衡。
    `
  },
  {
    id: 'getting-started',
    title: '从零开始搭建个人作品集网站',
    date: '2024-01-20',
    category: '前端开发',
    tags: ['React', 'TypeScript', 'Next.js'],
    excerpt: '详细介绍如何使用现代前端技术栈搭建一个专业的个人作品集网站，包括项目结构、组件设计、性能优化等方面。',
    content: `
# 从零开始搭建个人作品集网站

## 项目概述

本文将详细介绍如何使用 React + TypeScript + Next.js 技术栈搭建一个现代化的个人作品集网站。我们将涵盖从项目初始化到部署的完整流程。

## 技术栈选择

- **React 18**: 用于构建用户界面
- **TypeScript**: 提供类型安全
- **Next.js**: 提供SSR和优秀的性能
- **Styled Components**: 组件样式管理
- **React Router**: 路由管理
- **React Query**: 数据获取和缓存

## 项目结构

\`\`\`bash
src/
  ├── components/     # 可复用组件
  ├── pages/         # 页面组件
  ├── styles/        # 全局样式
  ├── utils/         # 工具函数
  ├── hooks/         # 自定义hooks
  ├── types/         # TypeScript类型定义
  └── data/          # 静态数据
\`\`\`

## 后续规划

1. 新功能开发
2. 性能持续优化
3. 用户体验提升
    `
  },
  {
    id: 'react-hooks-basics',
    title: 'React Hooks 基础：useState 和 useEffect',
    date: '2024-01-25',
    category: 'React',
    tags: ['React', 'Hooks', 'Best Practices'],
    excerpt: '深入解析 React 最基础的 Hooks：useState 和 useEffect，包括状态管理、副作用处理和包陷阱的解决方案。',
    content: `
# React Hooks 基础：useState 和 useEffect

## useState - 状态管理的基石

useState 是 React 中最基础的 Hook，用于管理组件的状态。在使用时需要注意：

- 状态更新必须返回新对象，不能直接修改原对象
- 可以使用 immer 的 produce 方法来简化不可变更新

\`\`\`typescript
import { produce } from 'immer';

function Counter() {
  const [state, setState] = useState({ count: 0 });
  
  // 正确的更新方式
  const increment = () => {
    setState(produce(draft => {
      draft.count += 1;
    }));
  };
}
\`\`\`

## useEffect - 处理副作用

useEffect 用于处理组件的副作用，比如数据获取、订阅等。主要特点：

- 异步执行，在渲染后触发
- 可能会导致闪烁问题
- 不支持 async 函数作为参数

\`\`\`typescript
useEffect(() => {
  // 异步执行
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };
  
  fetchData();
}, []);
\`\`\`

## useLayoutEffect - 同步副作用

当需要在 DOM 更新后立即执行某些操作时，可以使用 useLayoutEffect：

- 同步执行，会阻塞渲染
- 可能会导致性能问题
- 适用于需要立即获取 DOM 信息的场景

\`\`\`typescript
useLayoutEffect(() => {
  // 同步执行，可能会导致性能问题
  const element = ref.current;
  const { height } = element.getBoundingClientRect();
  setHeight(height);
}, []);
\`\`\`

## 闭包陷阱及解决方案

在使用 useEffect 时要注意闭包陷阱问题：

1. 使用 setState 函数式更新
\`\`\`typescript
setState(prevState => prevState + 1);
\`\`\`

2. 添加依赖数组
\`\`\`typescript
useEffect(() => {
  // ...
}, [dependency]);
\`\`\`

3. 使用 useRef 配合 useLayoutEffect
\`\`\`typescript
const valueRef = useRef(value);

useLayoutEffect(() => {
  valueRef.current = value;
});
\`\`\`

## 总结

- useState 用于管理组件状态，必须遵循不可变性原则
- useEffect 用于处理异步副作用，会在渲染后执行
- useLayoutEffect 用于处理同步副作用，会阻塞渲染
- 注意处理闭包陷阱，合理使用依赖数组和 useRef
    `
  },
  {
    id: 'react-hooks-advanced',
    title: 'React Hooks 进阶：useRef 和 forwardRef',
    date: '2024-01-24',
    category: 'React',
    tags: ['React', 'Hooks', 'useRef', 'forwardRef'],
    excerpt: '深入探讨 React 的 useRef 和 forwardRef 的使用场景和最佳实践，包括 DOM 引用、组件通信等高级应用。',
    content: `
# React Hooks 进阶：useRef 和 forwardRef

## useRef 使用场景

useRef 在 React 中主要有两种用途：

1. DOM引用：
\`\`\`typescript
// RefObject类型，用于存储DOM引用
const domRef = useRef(null);
\`\`\`

2. 可变值存储：
\`\`\`typescript
// MutableRefObject类型，用于存储可变值
const valueRef = useRef();
\`\`\`

## forwardRef 转发引用

forwardRef 用于将父组件的 ref 传递给子组件：

\`\`\`typescript
const ChildComponent = forwardRef((props, ref) => {
  return <div ref={ref}>子组件</div>
});

function ParentComponent() {
  const childRef = useRef(null);
  return <ChildComponent ref={childRef} />;
}
\`\`\`

## useImperativeHandle 自定义暴露方法

useImperativeHandle 可以让我们自定义要暴露给父组件的方法或属性：

\`\`\`typescript
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    getValue: () => {
      return inputRef.current?.value;
    }
  }));

  return <input ref={inputRef} />;
});
\`\`\`

## 闭包陷阱解决方案

使用 useRef 配合 useLayoutEffect 解决闭包陷阱：

\`\`\`typescript
function useInterval(fn: Function, delay?: number | null) {
    const callbackFn = useRef(fn);
    
    useLayoutEffect(() => {
        callbackFn.current = fn;
    }); // 无传参=updated
    
    useEffect(() => {
        const timer = setInterval(() => callbackFn.current(), delay || 0);
        return () => clearInterval(timer);
    }, []);
}
\`\`\`

## 总结

- useRef 可以用于存储 DOM 引用或可变值
- forwardRef 用于 ref 的向下传递
- useImperativeHandle 用于自定义暴露的方法
- 结合 useLayoutEffect 可以解决闭包陷阱
    `
  },
  {
    id: 'react-state-management',
    title: 'React 状态管理：useReducer 和 useContext',
    date: '2024-01-23',
    category: 'React',
    tags: ['React', 'Hooks', 'useReducer', 'useContext'],
    excerpt: '详细介绍 React 的状态管理方案，包括 useReducer 和 useContext 的使用，以及性能优化策略。',
    content: `
# React 状态管理：useReducer 和 useContext

## useReducer 状态管理

useReducer 用于处理复杂的状态逻辑：

\`\`\`typescript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return produce(state, draft => {
        draft.count += 1;
      });
    case 'decrement':
      return produce(state, draft => {
        draft.count -= 1;
      });
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
\`\`\`

## useContext 全局状态共享

useContext 用于跨组件层级的状态共享：

\`\`\`typescript
// 创建 Context
const ThemeContext = createContext(defaultValue);

// 提供值
function App() {
  return (
    <ThemeContext.Provider value={themeValue}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// 使用值
function ChildComponent() {
  const theme = useContext(ThemeContext);
  return <div style={{ background: theme.background }}>内容</div>;
}
\`\`\`

## Context 性能优化

Context 的性能优化策略：

1. 拆分 Context：
\`\`\`typescript
const UserContext = createContext(null);
const ThemeContext = createContext(null);
\`\`\`

2. 使用 memo 包裹子组件：
\`\`\`typescript
const ChildComponent = memo(({ onlyNeedThis }) => {
  return <div>{onlyNeedThis}</div>;
});
\`\`\`

## 总结

- useReducer 适合处理复杂状态逻辑
- useContext 用于���组件状态共享
- 注意 Context 的性能优化
- 合理拆分 Context 和使用 memo
    `
  },
  {
    id: 'react-performance',
    title: 'React 性能优化：memo、useMemo 和 useCallback',
    date: '2024-01-22',
    category: 'React',
    tags: ['React', 'Performance', 'memo', 'useMemo', 'useCallback'],
    excerpt: '深入探讨 React 的性能优化策略，包括 memo、useMemo 和 useCallback 的使用场景和最佳实践。',
    content: `
# React 性能优化：memo、useMemo 和 useCallback

## memo 组件优化

memo 用于优化函数组件的重渲染：

\`\`\`typescript
const ChildComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// 只有当 data 发生变化时，ChildComponent 才会重新渲染
\`\`\`

## useMemo 值缓存

useMemo 用于缓存计算结果：

\`\`\`typescript
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]); // 只有 a 或 b 变化时才重新计算
\`\`\`

## useCallback 函数缓存

useCallback 用于缓存函数引用：

\`\`\`typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // 只有 a 或 b 变化时才创建新函数
\`\`\`

## 最佳实践

1. memo + useCallback 配合使用：
\`\`\`typescript
const MemoChild = memo(({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
});

const Parent = () => {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // 空依赖数组，函数永远不变

  return <MemoChild onClick={handleClick} />;
};
\`\`\`

2. 避免过度优化：
- 只在性能确实有问题时使用
- 注意依赖数组的合理使用

## 总结

- memo 用于避免不必要的组件重渲染
- useMemo 用于缓存计算结果
- useCallback 用于缓存函数引用
- 三者经常配合使用达到最佳优化效果
    `
  },
  {
    id: 'react-typescript',
    title: 'React 组件类型系统：TypeScript 最佳实践',
    date: '2024-01-21',
    category: 'React',
    tags: ['React', 'TypeScript', '类型系统'],
    excerpt: '详细介绍 React 组件的 TypeScript 类型定义最佳实践，包括组件 Props、Hooks、事件处理等场景的类型处理。',
    content: `
# React 组件类型系统：TypeScript 最佳实践

## 基础类型定义

### ReactNode 和 ReactElement
\`\`\`typescript
// ReactNode 包含所有可以在 JSX 中使用的类型
type Props = {
  children: ReactNode;  // 可以是 ReactElement、string、number、null 等
  element: ReactElement;  // 只能是 JSX 元素
}
\`\`\`

### 函数组件类型
\`\`\`typescript
// 使用 FC (FunctionComponent) 类型
const MyComponent: FC<Props> = ({ children, element }) => {
  return <div>{children}{element}</div>;
};
\`\`\`

## Ref 相关类型

### useRef 类型
\`\`\`typescript
// DOM 引用
const domRef = useRef<HTMLDivElement>(null);

// 可变值
const valueRef = useRef<number>(0);
\`\`\`

### forwardRef 类型
\`\`\`typescript
type Props = {
  label: string;
};

const MyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} />;
});
\`\`\`

## 常用工具类型

### PropsWithChildren
\`\`\`typescript
type MyComponentProps = PropsWithChildren<{
  title: string;
}>;
\`\`\`

### CSSProperties
\`\`\`typescript
type StyleProps = {
  style: CSSProperties;
  color: CSSProperties['color'];
};
\`\`\`

### HTMLAttributes
\`\`\`typescript
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
};
\`\`\`

## 事件处理类型
\`\`\`typescript
type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
\`\`\`

## Record 类型
\`\`\`typescript
// 创建键值对对象类型
type Config = Record<string, number>;
const config: Config = {
  fontSize: 14,
  lineHeight: 1.5
};
\`\`\`

## Required 和 Omit
\`\`\`typescript
// 将可选属性变为必需
type RequiredProps = Required<PartialProps>;

// 删除指定属性
type NewProps = Omit<OriginalProps, 'unwantedProp'>;
\`\`\`

## 总结

- 合理使用 ReactNode 和 ReactElement
- 正确处理 Ref 相关类型
- 善用 TypeScript 内置工具类型
- 注意事件处理器的类型定义
    `
  },
  {
    id: 'react-rendering',
    title: 'React 渲染原理：从 JSX 到页面',
    date: '2024-01-20',
    category: 'React',
    tags: ['React', 'JSX', 'Virtual DOM', 'Fiber'],
    excerpt: '深入解析 React 的渲染原理，包括 JSX 转换、Virtual DOM 生成、Fiber 树构建和渲染过程。',
    content: `
# React 渲染原理：从 JSX 到页面

## 渲染流程概述

React 的渲染流程可以分为三个主要阶段：

1. JSX 转换
2. 虚拟 DOM 生成
3. Fiber 树构建和渲染

## JSX 到 Virtual DOM

### JSX 转换
\`\`\`typescript
// JSX
<div className="container">Hello</div>

// 转换后的 React.createElement 调用
React.createElement(
  'div',
  { className: 'container' },
  'Hello'
);
\`\`\`

### Virtual DOM 树
\`\`\`typescript
{
  type: 'div',
  props: {
    className: 'container',
    children: 'Hello'
  }
}
\`\`\`

## Fiber 架构

### Fiber 树结构
\`\`\`typescript
{
  type: 'div',
  props: { /* ... */ },
  child: FiberNode,
  sibling: FiberNode,
  return: FiberNode,
  alternate: FiberNode
}
\`\`\`

### 工作循环
\`\`\`typescript
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
\`\`\`

## 渲染阶段

### Render 阶段
- beginWork：从根节点开始处理
- reconcileChildren：对比新旧节点
- completeWork：处理完子节点后返回

### Commit 阶段
1. beforeMutation：变更前
2. mutation：执行 DOM 操作
3. layout：变更后处理（如 useLayoutEffect）

## 总结

- JSX 通过编译转换为 React.createElement 调用
- Virtual DOM 提供了对组件结构的抽象
- Fiber 架构实现了可中断的渲染
- 渲染分为 render 和 commit 两个主要阶段
    `
  },
  {
    id: 'react-custom-hooks',
    title: 'React 自定义 Hook 和组件设计模式',
    date: '2024-01-19',
    category: 'React',
    tags: ['React', 'Custom Hooks', '设计模式'],
    excerpt: '详细介绍 React 自定义 Hook 的开发和组件设计模式，包括状态管理、事件处理等常见场景的最佳实践。',
    content: `
# React 自定义 Hook 和组件设计模式

## 自定义 Hook 最佳实践

### 状态管理 Hook
\`\`\`typescript
function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props || {};
  const isFirstRender = useRef(true);
  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) return propsValue;
    if (defaultValue !== undefined) return defaultValue;
    return defaultStateValue;
  });

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  const setState = useCallback((value: SetStateAction<T>) => {
    const res = typeof value === 'function' ? value(stateValue) : value;
    onChange?.(res);
  }, [stateValue]);

  return [mergedValue, setState];
}
\`\`\`

### 事件监听 Hook
\`\`\`typescript
function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: HTMLElement | Window = window
) {
  const savedHandler = useRef(handler);

  useLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}
\`\`\`

## 组件设计模式

### 受控与非受控组件
\`\`\`typescript
interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange
  });

  return (
    <div>
      {mergedValue.toLocaleDateString()}
      <button onClick={() => setValue(new Date())}>Today</button>
    </div>
  );
}
\`\`\`

### 复合组件模式
\`\`\`typescript
const TabContext = createContext<{
  activeKey: string;
  onChange: (key: string) => void;
} | null>(null);

const Tabs = {
  Root: ({ children, defaultActiveKey }: TabsProps) => {
    const [activeKey, setActiveKey] = useState(defaultActiveKey);
    return (
      <TabContext.Provider value={{ activeKey, onChange: setActiveKey }}>
        {children}
      </TabContext.Provider>
    );
  },
  Tab: ({ keyName, children }: TabProps) => {
    const context = useContext(TabContext);
    const isActive = context?.activeKey === keyName;
    return (
      <div onClick={() => context?.onChange(keyName)}>
        {children}
      </div>
    );
  }
};
\`\`\`

## 总结

- 自定义 Hook 应该是可复用的、独立的功能单元
- 使用 useCallback 包装返回的函数
- 支持受控和非受控两种使用方式
- 合理使用组件组合和上下文共享
    `
  }
]; 