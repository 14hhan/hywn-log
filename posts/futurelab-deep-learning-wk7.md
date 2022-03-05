---
title: 미래연구소 딥러닝 입문 스터디 7주차
date: 2022-03-04
preview: "WK7: Scaler, Initialization, Mini-Batch Gradient Descent and Optimizer"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Scaler
- input data의 범위를 조정하는 방법
- 범위를 일정하게 만들기 위해서 사용
### Minmax Scaler
- feature의 최대, 최소를 1, 0이 되도록 조정하는 방식
- 공식: `(X_i - m) / (M - m)`
- 문제점: outlier가 존재할 때(다른 값에 비해 상대적으로 매우 큰 값이 있을 때) 결과가 이상
- Normalization은 Minmax Scaler에 포함 → Minmax가 `M, m`으로 만든다면 Normalization은 `1, 0`으로 만듦
### Standard Scaler
- 고교과정에서 배웠던 표준화
- 공식: `(X_i - μ / σ) (X~N(μ, σ^2))`

## Initialization
- initialization에 정해진 정답은 없음 → 주어진 data에 따라 적절한 것(= Xavier or He)을 사용
### Random Initialization
- 필요성: w가 작으면 gradient vanishing, w가 작으면 gradient exploading → w의 값을 적절하게 설정할 필요
- 용어 정리
  - fan-in: 들어오는 layer의 unit 개수 n[l-1]
  - fan-out: 현재 layer의 unit 개수 n[l]
- 문제점
  - fan-in이 많을 수록 출력되는 fan-out의 값이 커짐 → gradient exploading
  - fan-in이 작을 수록 출력되는 fan-out의 값이 작아짐  → gradient vanishing
- fan-in에 따른 initialization: fan-in이 클 수록 초기화 상수 작게 설정(= fan-in과 반비례한 초기화 상수)
### Zero Initialization
- 문제점: 내부 연산값들 row symmetric 현상 → 결국 gradient descent 값도 같아서 노드가 여러개 있어도 하나인 것과 같아짐
### Xavier Initialization
- glorot initialization이라고도 함(in tensorflow)
- 원래는 fan-in만 고려 하였으나 현재는 in, out 둘 다 고려함
- 공식: `(1/sqrt(fan-in)) * random`
- ReLU에서의 xavier: 점점 0 주위로 w값이 과도하게 몰릴 수 있음 → ReLU 계열에서는 He Initialization 사용
### He Initialization
- 공식: `(1/sqrt(fan-in)) * sqrt(2) * random`
- ReLU 계열에 특화 → 분포가 조금 더 1쪽으로 넓어짐

## Mini-Batch Gradient Descent
- 한번에 전체 data train하면 out of memory 발생할 수 있음
- 용어 정리
  - mini batch: 단일 iteration에서 gradient descent 하는데 사용하는 data 총 개수
  - epoch: data 전체를 train 한 횟수
![Mini-Batch Gradient Descent](https://user-images.githubusercontent.com/53527600/156776115-8c80fb85-3442-454f-9cbc-a241ff4e407f.png)
- Batch GD: 한 번에 모든 data로 iteration
- mini-batch GD: 한번에 mini-batch 씩 iteration
- mini-batch(batch_size): 단일 iteration에서 gd 하는데 사용하는 data의 총개수
- mini-batch GD(batch_size를 설정한 sgd(stochastic(확률적인) gradient descent))
- SGD: 한번에 data 1개씩만 train
### batch_size hyperparameter 설정
- 2의 거듭제곱 수
- 최솟값: 2^5 = 32
- 최댓값: 클 수록 좋음
  - batch_size가 클 수록 좋은 이유: 표본이 크면 클 수록 대표성이 높음(= b_s는 표본과 같은 의미라서 그러함) → 속도도 빨라짐(결국 training은 loop이기 때문에)
- batch_size 작음 → noise 높음 ⇒ overfitting 방지

## Optimizer
### Learning Rate에 따른 Train Loss 변화
- ![learning rate에 따른 train loss 변화](https://user-images.githubusercontent.com/53527600/156865190-43ef5bea-5388-4f9a-8cd6-5cf3170470bc.png)
- good learning rate와 비슷하도록 learning rate 조정
- 그래도 안 되면 initialization or optimizer 변경
### SGD
- random하게 추출한 mini-batch씩 GD진행
- 단점
  - 해당위치의 gradient만 고려함
  - gradient가 dimension 별로 차이가 클 시 minimum찾기 어려움
    - e.g. a4용지를 세로로 반을 접은 모양이라 할 때 수평방향: 기울기 완만(gradient 작음), 수직방향: 기울기 가파름(gradient 큼)
    - 작은것과 큰 것을 왔다갔다 → 오래걸림
  - local minimum 혹은 plateaus(= 일시적으로 gradient가 0에 가까운 지점) → gd 멈춤
    - e.g. 구슬을 굴린다고 생각하면 gradient가 0인 상태에서 멈춰버림
- 해결책
  - 구슬처럼 gd도 관성에도 줌(→ momentum)
  - 관성을 gradient or learning rate에 줄 수 있음 → optimizer 두 가지(= gradient, learning rate) 계보 존재
![Optimize 진행](https://user-images.githubusercontent.com/53527600/156865399-88a661b0-b1f3-4834-ae66-ee032efd20b7.png)
### 종류
- Gradient 계보
  - SGD + Momentum
  - NAG(Nasterov Accelerated Gradient)
- Learning Rate(= Step Size) 계보
  - Adagrad(Adaptive Gradient)
  - Rmsprop(Root Mean Squared Prop)
- Gradient + Learning Rate 계보
  - Adam(Adaptive Moment Estimation)
  - Rectified Adam
### 결론
- 대체적으로 Adam이 좋지만 항상 그런것은 아니므로 모든 optimizer를 사용해 그래프를 그려보고 가장 좋은 것을 쓰는 것을 권장
- optimizer에서는 learning rate 제외한 다른 hyperparameter tuning에 공을 들일 필요는 없음
