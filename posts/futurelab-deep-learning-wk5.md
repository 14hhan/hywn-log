---
title: 미래연구소 딥러닝 입문 스터디 5주차
date: 2022-02-19
preview: "WK5: Underfitting vs Overfitting and Holdhout Validation"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Hyper Parameter and Parameter
### Hyper Parameter
- 최적의 hyper parameter를 찾는 과정: tune → 사람이 직접 최적의 hyper parameter를 찾아야 함(수동적)
- e.g. learning rate, number of iteration(= epoch), number of hidden layer, number of node of each layers, activation functions of each layers
### Parameter
- 최적의 parameter를 찾는 과정: update → gradient descent를 통해 자동으로 최적의 값을 찾음(자동적)
- e.g. weight, bias

## Overfitting vs Underfitting
- fit: train과 동의어로 사용됨 → data를 학습하는 과정
  - 더 나아가서는 train set 뿐만 아니라 test set까지도 잘 예측하는 것
- Underfitting: model이 train data조차도 잘 맞추지 못하는 것
- Overfitting: model이 train data를 외워 버린 것
- underfitting과 overfitting은 직관적으로는 학습 정도를 조절해서 해결할 수 있으나, 이외에 다른 요인도 작용함(hiddne layer의 개수 등)
- Epoch: model에게 dataset을 보여준 횟수(= number of iteration)

![underfit_fit_overfit](https://user-images.githubusercontent.com/53527600/154790242-5b9c1af5-22bd-492d-ac5c-a20f535e1c78.png)

### Epoch 관점
1. underfit: 학습 초반 → 최적의 parameter가 아니므로 예측을 잘 하지 못함
2. fit: train 할 수록 주어진 train data를 잘 맞추게 됨 → 그러나 unseen data까지 잘 맞출 지는 알 수 없음
3. overfit: 때문에 과도하게 학습하다 보니 unseen data는 잘 맞추지 못하고 train data는 잘 맞춤
⇒ 따라서 train에 쓰이지 않은 데이터로 중간중간 overfit을 확인해야 함 → validation set 설정

### Model의 크기(layer, unit) 관점
1. underfit: 가벼운 model은 선형에 가까움 → 예측을 잘 하지 못함
2. fit: model이 복잡해 질 수록 주어진 train data를 잘 맞추게 됨 → 그러나 unseen data까지 잘 맞출 지는 알 수 없음
3. overfit: 때문에 model이 너무 거대해 지면 unseen data는 잘 맞추지 못하고 train data는 잘 맞춤
⇒ 따라서 train에 쓰이지 않은 데이터로 중간중간 overfit을 확인해야 함 → validation set 설정

### 해결책
- underfit: model의 표현력을 키움 → node, layer, activation function 조정
- overfit: number of iteration, node, layer의 깊이 등을 줄임

![fitting_graph](https://user-images.githubusercontent.com/53527600/154790241-a6f115e7-bd2d-4796-b94b-8221d7e9cace.png)

### Validation Set, Bias and Variance
- train set이 문제집이라고 비유하면 test set은 수능, validation set(= dev set)은 모의고사라고 비유 가능
- Bias: 참 값과 추정 값의 차이 → loss
- Variance: 추정 값들의 흩어진 정도(= 정답을 외워버린 정도) → model complexity
- bias가 높아지만 variance가 낮아지고 variance가 높아지면 bias가 낮아지므로 적절히 trade off 해야 함
![bias_and_variance](https://user-images.githubusercontent.com/53527600/154790372-6be8b9ad-7924-46d2-b9ca-daf9af9836f2.png)

## Holdout Validation
- No Free Lunch Theorem: dataset마다 최적의 hyper parameter가 다름 → 어떠한 model에 대해 적절한 크기나 구조를 결정하는 마법같은 공식은 없음
- No Free Lunch 해결책: holdout validation
- Holdout Validation: data를 split 하여 train data, validation data 구성
  - train data로 검증하는 것은 unseen data에 대한 일반성을 확보하지 못하기 때문
- validation set을 이용한 결과에 따라 최적의 hyper parameter를 찾아감 
  - 하지만 validation data로 gradient descent는 하지 않음
- validation과 test data가 unseen임은 성립해야함
- validation set vs test set
  - validation set은 training에 관여(→ hyper parameter tuning) 하지만 직접적인 관여는 아님(= unseen data)
  - test set은 training에 어떠한 관여도 하지 않음
- Holdout 방식
  - 2-way holdout = (training + test)
  - 3-way holdout = (training + test + validation)
- holdout은 slicing을 사용하거나 scikit-learn의 `train_test_split()` 이용

## Build a model by sequential
- 이때까지 배웠던 layer → dense layer(= fully connected layer): weight matrix의 shape가 `(이전 layer의 node 개수, 다음 layer의 node 개수)`
```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# 기본 1
dense1 = Dense(units = 32, activation='relu', input_shape=(784,))
dense2 = Dense(72, activation = 'tanh')
dense3 = Dense(1, activation = 'sigmoid')
layers = [dense1, dense2, dense3]
model1 = Sequential(layers)

# 기본 2
model2 = Sequential([Dense(units = 32, activation='relu', input_shape=(784,)),
                      Dense(72, activation = 'tanh'),
                      Dense(1, activation = 'sigmoid')])

# add method 이용
model2 = Sequential()
model2.add(Dense(64, activation='relu', input_dim = 784))
model2.add(Dense(100, activation = 'relu'))
model2.add(Dense(128, activation = 'relu'))
model2.add(Dense(32, activation = 'relu'))
model2.add(Dense(10, activation = 'softmax'))
```
