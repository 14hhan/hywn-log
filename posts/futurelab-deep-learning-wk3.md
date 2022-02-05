---
title: 미래연구소 딥러닝 입문 스터디 3주차
date: 2022-02-04
preview: "WK3: Neural Network Overview"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Backpropagation 계산 과정
### Gradient Descent
- 어떠한 시작점을 잡아서 미분했을 때의 기울기가 어땠느냐, 부호에 따라 왼쪽으로 갈지 오른쪽으로 갈지를 정해줌
- 1차원이 아닌 더 고차원: `z = f(x, y)` → 2차원 부터는 곡면이 그려질 것이므로 곡면에서 z값이 가장 적은 부분을 찾을 것
- `(x_0, y_0)` 에서 미분 값 계산 → vector 값이 나옴
- N차원에서는 1차원과 달리 옮겨갈 방향이 상당히 많아짐 → 가장 가파른 방향으로 가면 됨
- `x_(n+1) = (x_n - a)f’(x_n)`
### Vectorize
- Vectorize 시 행렬 계산을 통해 vector를 한 번에 계산할 수 있게 됨 → 계산의 효율성이 높아지며 수치적인 안정성을 얻을 수 있음
### Computation Graph
- Logistic Regression: Binary Classification 상황이라 가정
- `y = 0 or 1 → 0 < y^ < 1`
- `0 < Sigmoid(Linear Regression) < 1`
	- `z = w_1x_1 + w_2x_2 + … +w_nx_n + b` ← linear combination(offine combination)
- Linear Regression에서는 SE 사용 했었으나 Logistic Regression 에서는 CE 사용
	- CE: `L(y^, y) = -(y log y^ + (1-y)log(1-y^))` → 여기서 `y = 0 or 1`
		- 따라서 `(1 - y) = 1 or 0`
		- if `y = 1` → minL ⇒ `y^ ~= 1`
		- if `y = 0` → minL ⇒ `y^ ~= 0`
- Computation Graph
	- linear regression: `x^(1) = (x^(1)_1, x^(1)_2, x^(1)_3), x^(2) = ...`
	- optimization: 주어진 data를 가장 잘 설명하는 classifier를 만들기 위해 parameter를 수정해 나가며 좋은 classifier를 만드는 것
- Vectorized
	- `Z = WX = (X^T)W`
	- `w_1, w_2, w_3, b`를 vectorize 해서 한 번에 gradient descent
### 계산 과정
Computation Graph를 통해서 Backpropagation을 계산하는 과정
![computation_graph_계산_과정_1](https://user-images.githubusercontent.com/53527600/152498914-3405f96b-45e6-47e3-af62-b6efbb8deed2.png)
![computation_graph_계산_과정_2](https://user-images.githubusercontent.com/53527600/152498904-a2bdeb64-c59b-4ec2-b1f2-0ba18129ac3e.png)

## Hidden Layer
- 중간층이 생김 → 조금 더 고등 model을 만들 수 있게 됨
- input layer node: feature
- hidden layer: 중간층
- 이전에 배웠던 NN: input layer에서 바로 output layer(= prediction)
- NN with hidden layer: input layer → 중간층(= hidden layer) → output layer
- hidden layer 개수 / 노드 개수 → 임의로(원하는대로) 지정 가능
- parameter: model에게 직접적인 영향을 미침(e.g. weight, bias)
- hyper parameter: model의 성능에 영향을 미침(e.g. step size, hidden layer 노드의 개수, hidden layer 자체의 개수)
	- hidden layer node 개수, layer 자체 개수가 많아지면 model의 성능이 높아지는 것은 맞지만, 지나치게 많아지면 overfitting이 될 수 있음
### NN 용어 정리
![용어_정리](https://user-images.githubusercontent.com/53527600/152626803-538dd266-d4ab-40bf-badd-a9f7b89f082e.jpeg)

## Shape 계산
- `z^[1] = w^[1]x^[0] + b^[1]`
  - `x^[0]`: input data
  - `w^[0]`: input layer
  - `w^[1]`: weight matrix([0] → [1])
  - `b^[1]`: bias
  - `A^[1] = Sigmoid(z^[1])`: activation matrix
- `z^[2] = w^[2]x^[1] + b^[2]`
  - `w^[2]`: weight matrix([1] → [2])
  - `b^[2]`: bias
  - `A^[2] = Sigmoid(z^[2])`: activation matrix
- 위와 같이 [3], [4], ..., [k] 까지
- `w^[k]` shape: `(number of k-th layer, number of (k-1)-th layer's node)`
- `b^[k]` shape: `(number of k-th layer's node, 1)`
- `x^[0]` shape: `(number of 1st layer's node, m)`(→ m: number of data)
- `z^[k]` shape: `(number of k-th layer's node, m)`
  - `z^[k] = w^[k]z^[k-1] + b^[k]` (if k = 0 → `z^[0] = k^[0]`)

## Hidden Layer 및 Node의 개수
- n개의 hidden layer를 쌓는데 있어서 hidden layer의 개수나 hidden layer의 노드의 개수나 본인이 정해주기 나름
- 중요한 것은 input layer node 개수는 data의 feature의 개수
- output layer의 개수는 binary classification이냐, regression이냐 multi-class classification 등 이냐에 따라 달라짐

## Hidden Layer를 포함한 계산 과정
![hidden_layer_계산_과정](https://user-images.githubusercontent.com/53527600/152627128-95ba39e7-d3b8-4c0c-a225-bfa05467eb47.png)

## Numpy
### Element-wise product
- dot product는 행렬곱(→ np.dot)
- element-wise product는 행렬 상 위치가 같은 두 원소끼리 곱셈만(→ np.multiply)
	- element-wise product를 할 때는 두 행렬 x1, x2의 shape가 같거나 shape가 같지 않을 경우 broadcasting 가능해야 함
### Broadcasting
- shape가 맞지 않는 두 행렬의 shape를 맞춰주기 위해서 하는 것
- 두 행렬 중 더 작은 shape를 가진 행렬에게 진행함
- element-wise로(= column-wise or row-wise) 곱해서 진행함
#### Broadcasting 경우의 수
1. nd array, scala
	- element-wise 하게 scala를 더해줌
2. 2d array, 1d array
	- 2d array shape(= x1): `(a, x)`
	- 1d array shape(= x2): `(x, )`
	- x1의 shape의 끝과 x2의 shape의 앞이 맞으면 broadcast 가능
3. 2d array, 2d array
	- 2d array(= x1) shape: `(a, x) / (x, a)`
	- 2d array(= x2 = 확장해 줄 array) shape: `(1, x) / (x, 1)`
4. nd array(n >= 3), 2d array
	- nd array shape(= x1): `(..., x, y)`
	- 2d array(= x2): `(x, y)`
	- x1의 shape의 끝과 x2의 shape의 앞이 맞으면 broadcasting 가능
