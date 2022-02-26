---
title: 미래연구소 딥러닝 입문 스터디 6주차
date: 2022-02-26
preview: "WK6: Softmax, Regularization and Dropout, DL Tutorial"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Softmax
### Output layer와 Class의 연관성
- 기존에 배운 regression, binary classification → output layer node 개수 1개(= 결과값이 1개)
- multiclass classification: class 개수 = C = n^[L] = output layer node 개수 (→ output layer와 class는 연관이 있을 것)
### Softmax 연산 과정
- binary classification: `W^[L]A^[L-1]+b^[L]=Z^[L] → sig(Z^[L]) = A^[L] → 0 or 1`
- multiclass classification: `W^[L]A^[L-1]+b^[L]=Z^[L] → a^[l]_i = t_i / sigma(t_i) → 0 or ... or C-1 (t_i = exp(Z^[L]))`
### Binary classification과 Multiclass classification의 유사성
- Binary: `sigmoid = 1 / (1+e^(-WX)) = e^(w_1x) / (e^(w_1x) + e^(w_2x))`
- Multiclass: `softmax = e^(w_ix) / (e^(w_1x) + e^(w_2x) + ... + e^(w_cx))`
- softmax는 sigmoid에서 유도

## Multiclass classification
### Output의 유사 및 Loss 계산
- one-hot encoding: class간에 연관 관계가 없고 독립적이므로 label값을 임의의 scalar 부여하지 않고 vector 형태로 부여(→ class 간의 독립성을 표현하기 위해)
- loss function: `L(y, y^) = - Sigma j = 1 to C (y_j log y^_j)`

## 문제 해결 방법
![overfit/underfit_문제_해결_방법](https://user-images.githubusercontent.com/53527600/155825657-a42ffd89-304c-4ad0-acd4-05fb79927356.jpeg)

## Regularization and Dropout
### Regularization
- 목적: model이 과도하게 복잡해지는 것 방지(overfitting 방지)
- 예시: logistic regression
  - `J(w, b) = 1 / m Sigma i = 1 to m (L(y^^(i), y^(i)) + (lambda / 2m) ||w||` (lambda: hyper parameter)
    1. L_2 regularization(주로 사용): `||w||^2_2 = Sigma j = i to n_x (w^2_j) = (w^t)w`
    2. L_1 regularization: `||w||_1 = Sigma j = i to n_x (|w_j|)`
- regularization을 많이 하면 할 수록(~= lambda 값이 커질수록) weight(절대값)이 감소하게 됨
- model이 과도하게 복잡해지는 것 방지 = weight(절대값)을 줄여주는 효과 = overfitting 방지
  - 과정: lambda값을 올림 → W^[L]이 0에 가까워짐 → hidden layer의 효과 사라짐 → simple, small neural network이 됨 → overfitting, underfitting 사이의 알맞는 lambda를 찾으면 됨
- 직접 layer를 줄이는 것 보다 효율적(사람은 어떤 layer를 줄여야 할 지 잘 모름)
### Dropout
- Deep Learning에서는 regularization(→ ML에서 잘 쓰임)보다 dropout을 자주 씀
- 일부 node를 없애버리는 것
- 과정: 매 학습마다 랜덤하게 node를 지워서 학습 → 매 학습마다 다른 node들이 지워졌다가 복원되었다가 반복
- 실제 layer가 아닌 dropout layer를 따로 둠
- keepprob: node 남길 비율
- drop_rate: node 지울 비율
  - 커질 수록 overfit 방지효과 커짐
- 유의사항
  - layer 별 다른 drop_rate 설정 가능
  - weight의 shape가 클 수록 drop_rate 높게 설정
  - input layer dropout은 권장하지 않음

## Deep Learning Tutorial
예시: mnist
1. Data 업로드
```python
from tensorflow.keras.datasets import mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
```
2. Data 확인
```python
import matplotlib.pyplot as plt
%matplotlib inline 

index = 40
img = x_train[index]
print(y_train[index])
plt.imshow(img,cmap='gray')
```
3. Data preprocess
  - 형변환: astype를 이용해 `float32`형으로 전환(→ 혹시 모를 error 방지)
  - normalization
  - flatten: 3d array to 1d array
  - one-hot encoding
  - loss 선택
    - one-hot encoding O → `sparse_categorical_crossentropy`
    - one-hot encoding X → `categorical_crossentropy`
4. 모델 만들기
  - Sequential, add 사용
5. 모델의 학습과정 설정
  - compile의 핵심 3가지 argument
    - optimizer
    - loss(= cost) 설정
    - metrics(평가 지표): 대표적으로 accuracy가 존재
