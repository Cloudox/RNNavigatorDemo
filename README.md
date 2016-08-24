# RNNavigatorDemo
React Native实现Navigator组件导航的demo

最近在学React Native，了解了一个原本iOS中非常重要的导航控件的使用方法。不过在React Nativa中，这个导航控件是不会自带顶部的导航栏的，也不会自动生成返回按钮之类的，只是提供了类似的导航功能，且原理也是出栈入栈的方式，也就是说同样是有着push和pop方法的。这里不讲React Native的基础了，直接讲一讲Navigator这个组件的基本使用方法。

对于一个导航组件，最基本的就是下面几个点：

* 进入下一个界面
* 返回上一个界面
* 传递数据给下一个界面
* 返回数据给上一个界面

我们一个一个来看。

首先要使用Navigator组件，按照惯例是要import它的，这个别忘了。一般我们都是在index.ios.js文件中放置整个app的入口界面，这里我们也是要把Navigator这个组件框架放在index.ios.js文件中，代码如下：

```JavaScript
export default class RNNavigatorDemo extends Component {
  render() {
    let rootViewName = 'FirstView';
    let rootComponent = FirstView;

    return (
      <Navigator
        initialRoute = {{ name: rootViewName, component: rootComponent }}
        configureScene = {(route) => {
          return Navigator.SceneConfigs.HorizontalSwipeJump ;
        }}
        renderScene = {(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator = {navigator} />
        }} />
    );
  }
}
```

可以看到我们return了一个Navigator容器。initialRoute就是我们要放在这个导航容器中的根界面，也是第一个界面，这里我们放的是名为FirstView的界面，这个界面是由另一个js文件描述的，所以也要记得import。我们把它作为component参数的值，至于另一个name参数，真的也就是一个name而已，不太重要。然后紧跟着的configureScene是描述界面之间的过渡动画的，比如从右边滑出来啊或者从底部滑出来之类的，在node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js文件中可以看到所有可以选的方式。接下来的内容直接写就可以了。

到此，我们放置了一个Navigator的导航容器，第一个界面是我们的FirstView界面，至于界面长什么样子，就是在FirstView.js文件中描述了。

我们要体会进入下一个界面的过渡效果，就肯定要在FirstView中做一个按钮，点击按钮进入下一个界面，这里我们写的界面代码如下：

```JavaScript
return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPressButtonA.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为1的学生信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressButtonB.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为2的学生信息
            </Text>
          </TouchableOpacity>
        </View>
      );
```

TouchableOpacity 是一个可响应点击的组件，这里我们做了两个类似按钮的东西，分别对应两个响应方法，在响应方法中我们调用navigator的push方法就可以进入下一个界面了，当然下一个界面我们也要事先准备好（注意需要import Navigator、TouchableOpacity和下一个界面的文件），其中一个响应方法代码如下：

```JavaScript
  onPressButtonA() {
    let _this = this;
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'SecondView',
        component: SecondView,
        params: {
          id: 1
        }
      });
    }
  }
```

可以看到，我们首先获取了navigator这个容器，然后调用其push方法，在push方法中我们也是需要提供下一个界面，也就是这里的SecondView，同时我们还传递了一个名为id的参数给下一个界面，另一个按钮的响应方法类似，只是传的id是2。

我们现在去看下一个界面的文件，它的界面我们也要设置界面的样式，先看代码：

```JavaScript
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          要查询的学生id为：{ this.state.id }
        </Text>
        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
          <Text style={styles.welcome}>
            点击返回学生信息
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
```

首先我们显示id号，看我们要传的参数是否正确传输了，然后我们同样设置一个按钮，其响应方法要返回上一个界面。这里我们是从state中获取id的，为什么可以这样呢？因为我们在第一个界面中把id设为了state的一个属性，在第二个界面中也设了id这个属性，通过navigator，会获取到存在于props中的id这个值，我们使用setState方法将它设到我们的第二个界面的state中就可以了：

```
// FirstView.js
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      user: null
    };
  }

// SecondView.js
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }
```

这样就存在于第二个界面的state中了，我们在做界面的时候通过this.state.id获取到它就可以显示了，完成了向下一个界面传值。

下一步我们要在响应方法中回到上一个界面中，使用pop方法即可：

```JavaScript
  onPressButton() {
    const { navigator } = this.props;

    if(navigator) {
      navigator.pop();
    }
  }
```

这样就可以回到上一个界面了。现在我们还剩下从第二个界面往第一个界面回传内容没有实现。这样通过回调来实现，在第一个界面的按钮响应中，我们除了传递id，还要构造一个方法：

```JavaScript
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      user: null
    };
  }

  onPressButtonA() {
    let _this = this;
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'SecondView',
        component: SecondView,
        params: {
          id: 1,
          getUser: function(user) {
            _this.setState({
              user: user
            })
          }
        }
      });
    }
  }
```

在响应方法的params参数中，我们除了要传递的id参数，还构建了一个getUser的方法，这个方法就是在获取user属性后更新自身界面的state的，所以我们也要在自身的state中设置user这个属性，不过一开始是null。

在第二个界面的响应方法中，我们除了pop返回，还要根据id传回user：

```JavaScript
const USER_MODELS = {
  1: { 姓名: '小明', 性别: '男' },
  2: { 姓名: '韩梅梅', 性别: '女' }
};

  onPressButton() {
    const { navigator } = this.props;

    if(this.props.getUser) {
      let user = USER_MODELS[this.props.id];
      this.props.getUser(user);
    }

    if(navigator) {
      navigator.pop();
    }
  }
```

我们构建了一个键值对USER_MODELS ，根据id不同，我们从其中获取不同的user值，然后通过使用getUser方法传回user给上一个界面。为了在上一个界面中显示出来，我们FirstView的界面样式也要变一下了：

```JavaScript
  render() {
    if( this.state.user ) {
      return (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.onPressButtonA.bind(this)}>
              <Text style={styles.welcome}>
                查询ID为{ this.state.id }的学生信息
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressButtonB.bind(this)}>
              <Text style={styles.welcome}>
                查询ID为2的学生信息
              </Text>
            </TouchableOpacity>
            <Text style={styles.welcome}>
              学生信息：
            </Text>
            <Text style={styles.welcome}>
              { JSON.stringify(this.state.user) }
            </Text>
          </View>
        );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPressButtonA.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为1的学生信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressButtonB.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为2的学生信息
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
```

可以看到一开始我们就检查了有没有user信息，没有说明还没请求数据，就只显示两个按钮，有的话说明已经请求到了，就显示我们获取到的user信息。

以上基本叙述完毕，看下效果图吧：

![](https://github.com/Cloudox/RNNavigatorDemo/blob/master/RNNavigatorDemo.gif)
