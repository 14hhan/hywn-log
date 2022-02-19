---
title: 미래연구소 딥러닝 입문 스터디 5주차
date: 2022-02-19
preview: "WK5: Underfitting vs Overfitting and Holdhout Validation"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Neural Net Learning
- Neural Net Learning → Data에 대응되는 `f`를 찾는 과정
- NN에서 hidden layer 1개: 연속 함수 구현 가능
- NN에서 hidden layer 2개 이상: 불연속 함수 구현 가능
- XOR → linear classification 불가
  - ![XOR_graph](https://user-images.githubusercontent.com/53527600/153695862-b7c77f07-f6c2-41e9-be76-9cd292a66ce3.png)
  - 하지만 hidden layer 1개만 있어도 표현할 수는 있음
- ![진행_과정](https://user-images.githubusercontent.com/53527600/153695890-6adfac84-eb3c-4d28-8b05-18043eef89c2.png)
### Shapes
- `W` shape: (진행 방향 layer의 node의 개수, input_dim(= feature의 dim))
- `X` shape: (input_dim, vectorize 시킨 data의 개수)
- `b` shape: (진행 방향 layer의 node의 개수, 1)
- `WX` shape: (진행 방향 layer의 node의 개수, vectorize 시킨 data의 개수)
- `WX + b` shape: (진행 방향 layer의 node의 개수, vectorize 시킨 data의 개수) + (진행 방향 layer의 node의 개수, 1) → shape이 맞지 않을 경우 broadcasting으로 해결

## Activation
### Non-linear Activation
- `sigmoid`가 아닌 다른 함수로도 activate가 가능
- Why non-linear activation?
  - linear regression의 한계: 직선(→ plane, hyper plane)으로만 fitting 가능
  - 그러나 logistic regression에서는 sigmoid를 이용함으로 강직성을 완화함
  - 예시: y = sin(x)를 linear regression으로 표현하면 처음에는 직선의 그래프만 그려지지만 여러 층의 activation을 통하면 `sin(x)` 그래프와 비슷한 form을 기대할 수 있음
  - 가장 중요한 이유는 **linear activation을 여러번 해 봤자 linear activation을 1번만 한 결과물과 같기 떄문**에 hidden layer를 깊게 쌓을 필요가 없어지기 때문
    - ![증명_과정](https://user-images.githubusercontent.com/53527600/153695918-f5f1c860-bc97-43e2-80f6-5ada61795ccd.png)
### Vanishing Gradient
- sigmoid 특징: 결과값이 0보다 크고 1보다 작음
- 따라서 backpropagation 시 chain rule에 의해 다양한 값들이 곱해지면 0과 1사이의 값이 계속 곱해지는 것이므로 결국 gradient가 상당히 작은 값이 되어버림
- Vanishing Gradient: 많은 hidden layer를 쌓음 → non-linear activation이 많아짐 → sigmoid를 많이 하게 됨 → gradient가 상당히 작은 값이 되어버리는 현상

## Activation Function
### sigmoid
- ![sigmoid_graph](https://user-images.githubusercontent.com/53527600/153695974-baf0378d-04f7-4c1d-882d-63605c8c2bf7.png)
- ![sigmoid_function](https://user-images.githubusercontent.com/53527600/153695973-7a3b47a5-dc8d-4948-b9ea-4590b0cf71be.png)
- 장점: binary classification의 output layer라는 특수한 상황에 적합
- 단점: gradient descent 속도 저하
### tanh
- ![tanh_graph](https://user-images.githubusercontent.com/53527600/153695995-5838b8c7-1fe2-4906-947c-27d2e57b5eef.png)
- ![tanh_function](https://user-images.githubusercontent.com/53527600/153695994-5f6abe17-8b7b-4a08-b511-375b438353e4.png)
- 장점: sigmoid보다는 vanishing gradient가 덜함
- 단점: gradient descent 속도 저하
### ReLU
- ![ReLU_graph](https://user-images.githubusercontent.com/53527600/153696029-030fb868-ad1b-410e-b126-18532bebbcc1.png)
- ![ReLU_function](https://user-images.githubusercontent.com/53527600/153696027-7ec63e98-c48c-438b-b40d-4ee3c59c81d6.png)
- 장점: sigmoid, tanh의 vanishing gradient 문제 해결
- 단점: 절반의 gradient가 0(= dying ReLU 현상)
### Leaky ReLU
- ![Leaky_ReLU_graph](https://user-images.githubusercontent.com/53527600/153696062-44ba60fa-70d1-49c7-86a1-19341df51004.png)
- ![Leaky_ReLU_function](https://user-images.githubusercontent.com/53527600/153696061-120dfffd-cb05-4efc-962d-29714b598d58.png)
- 장점: dying ReLU 현상을 해결(→ GAN과 같이 train이 어려운 경우에 사용)
### Output Layer의 Activation Function
- 어떤 activation function이 다른 activation보다 무조건 더 좋은 것은 아님 → model에 따라 더 뛰어난 activation function이 있음
- 층 별로 다른 activation function 사용 가능 → output layer에서는 맞는 activation function 사용
- ![activation_functions](https://user-images.githubusercontent.com/53527600/153696094-b6419dc8-2ac1-4191-abd1-d78208caaf4c.png)

## Random Initialization
- zero initialization의 문제점
  - row symmetric: parameter update 해도 row가 계속 같은 현상
  - vanishing gradient
- 대책
  1. `np.random.randn(shape)`
  2. 0보다 큰 적절한 상수를 곱함 (단, 너무 크면 saturation(= weight의 update가 잘 일어나지 않는 현상)이 일어날 수 있음)
### Xavier / He Initialization
![Xavier_He_Initialization](https://user-images.githubusercontent.com/53527600/153696122-30d22694-90a1-4d12-90a1-89dc53a554c6.png)
