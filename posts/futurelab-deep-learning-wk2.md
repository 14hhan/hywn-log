---
title: 미래연구소 딥러닝 입문 스터디 2주차
date: 2022-01-29
preview: "WK2: Neural Network 작동 원리"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Dataset
Supervised Learning
- continuous class: regression
- discrete class: 2 → binary classification, 3 이상 → multiple classification
#### cat classification
- cat/non-cat → binary classification
- DL에서 데이터셋의 조건 → 컴퓨터로 연산 해야됨 → input(feature), output이 숫자여야
- cat/non-cat은 숫자가 아니므로 전처리를 해야함
### input - image
1. image를 어떻게 수치화 할 것인가
- image는 pixel로 이루어져있음
- 각각의 pixel은 명암을 기준으로 0~255의 값을 가짐
- color/grayscale
- color → 3 channel, grayscale → 1 channel
- ML model이 image를 처리하려면 이미지를 숫자로 변환 → pixel값을 이용
- 1d array 형태 → e.g. [3, 7, 1, 6, ...]
- 색깔당 1d array → 총 3d array이므로 1d array로 flatten을 해야함
2. 추가로 진행할 처리
- 1d array가 아닐 경우 1d array로 flatten
#### output
1. output(answer)를 어떻게 수치화 할 것인가?
- cat: y = 1
- non-cat: y = 0

### Notation 정리
1. feature(= image = x)
- feature의 개수 파악 → (image가 64 pixel이라 가정) n_x = 64 * 64 * 3 = 12288 
2. x = data 1개의 input = feature vector = [x_1, x_2, ..., x_1228(=x_(n_x))] = x^(1)
3. y = data 1개의 output = label = 0 or 1(→ binary classification)
4. (x, y) = training data 1개
- m개의 data: `{(x^(1), y^(1)), ..., (x^(m), y^(m))}`
- n_x =/= m
- n_x: data 1개의 feature의 개수(→ data가 담고있는 정보의 개수)
- m: data 자체의 개수

### Vectorization
data m개를 matrix 형태로 처리/보관하는 것
- data 1개
	- x^(1) shape: (n_x, 1)
- input m개
	- x = [x^(1), x^(2), ..., x^(m)]
- shape: (n_x, m)
- output m개
	- y = [y^(1), y^(2), ..., y^(m)]
- y shape: (1, m)

## Logistic Regression: Neural Network의 작동 원리
### 들어가기에 앞서
1. x = [x_1, ..., x_(n_x)], y
2. parameter
  - w: weight 
    - 각 feature에 대한 가중치(→ `w = [w_1, ..., w_(n_x)]`)
    - x와 shape이 같아야 함
  - b: bias
    - 편향 되었을 경우 사용, 필요 없으면 0
    - 가설함수 `H(x) = w_1x_1 + ... + w_(n_x)x_(n_x) + b`
### 1. Initialization
- gradient descent를 시작할 w, b 설정
### 2. Forward Propagation
1. 설정한(주어진) x, w, b로 y에 대한 예측값(= y^) 계산
  - 계산 과정: w와 x를 내적한 값 + b(= `w_1x_1 + ... + w_(n_x)x_(n_x) + b`)
2. sigmoid 함수로 예측값의 범위를 0과 1사이로 줄임
  - 가설함수 `H(x) = w_1x_1 + ... + w_(n_x)x_(n_x) + b`
    - 문제: y = 0 or 1로 설정했으나 y^ 은 (-∞, ∞)의 범위를 갖게 됨
    - 따라서 H(x)의 범위를 [0, 1]로 만들어야 함 → sigmoid 함수 사용
  - sigmoid function `S(x) = 1/(1+e^(-x))`
  - binary classification 시 sigmoid 사용 → `S((w^t)x + b)`
  - but sigmoid를 사용해도 discrete하지 않음
    - 0.5 기준으로 discrete하게 나눠줌(→ `y^ >= 0.5: predict 1, y^ < 0.5: predict 0`)
### 3. Compute Cost
- binary classification에서 MSE를 쓰게되면 문제점이 많음
- binary classification의 loss 함수: binary cross-entropy loss(= BCE)
	- `L(y, y^) = - [ylogy^ + (1-y)log(1-y^)]`
		- y = 1 → L(y, y^) = -logy^ (⇒ logy^ 커지면 loss가 줄어듦 → y^ 커지면 loss가 줄어듦)
		- y = 0 → L(y, y^) = log(1-y^) (⇒ log(1-y^) 커지면 loss가 줄어듦 → y^ 줄어들면 loss가 줄어듦)
- binary classification에서는 MSE 대신 BCE를 씀
- Cost 함수: J(w, b) = (1/m) Sigma(i = 1 to m) [y^(i)logy^^(i) + (1-y^(i))log(1-y^^(i))]
#### 참고
- loss =/= metric
- loss: model이 잘했는가 못했는가를 평가 → model을 만드는 과정에서 model의 improvement 위해서 사용
- metric: 가시적으로 model이 잘 만들어졌는가를 accuracy를 통해 평가 → 최종 trained model의 성능 평가에 사용
### 4. Backward Propagation
- Backpropagation이라고도 함
- gradient descent 시 parameter(w, b)를 업데이트할 방향(= 접선 기울기)을 구하는 과정
- x, w, b → `z = (w^t)x + b → y^ = del((w^t)x + b)`
- J(w, b) ⇒ y, y^를 통해 계산
- 접선 기울기: `delJ/delw = delJ/dely^ • dely^/delz • delz/delw`(→ chain rule 이용하여 구할 수 있음)
### 5. Gradient Descent
- backpropagation에서 구한 gradient 방향(= delJ/delw)으로 learning rate 크기(= a)만큼 parameter(w, b) 업데이트
- `w = w - a(delJ/delw)`
### 정리
1. Initialization: NN에 layer 별로 임의의 parameter(w, b)를 설정
2. Forward Propagation: x, w, b를 이용하여 계산 → y^ 구함
3. Compute Cost: y, y^사이 cost(loss)를 구하여 model 평가
4. Backward Propagation: chain rule을 기반으로 w에 대한 cost의 미분계수(= gradient)을 구함
5. Gradient Descent: 4에서 구한 gradient를 이용해 이전보다 나은 parameter 구함

## Numpy
### Vectorization
- 정의: data를 for문을 사용하지 않고 batch로 계산하는 것
- for문을 사용할 시의 단점
	- 속도가 느림
	- 코딩의 양이 늘어남
- vectorization은 for문 사용할 것을 matrix 연산으로 변환하여 한 번에 여러개의 연산을 진행하므로 속도가 빠름
### 용어 정리
![용어_정리](https://user-images.githubusercontent.com/53527600/151645523-ff3c82aa-c06e-45fc-bd82-60c40d4f296f.png)
### Numpy
- vector, 행렬 연산을 위한 수치해석용 python 라이브러리
- 빠르고 편리한 것이 장점
