---
title: 미래연구소 딥러닝 입문 스터디 9주차
date: 2022-03-19
preview: "WK9: Metrics, Pandas and RNN"
---

**미래연구소: https://futurelab.creatorlink.net/**

## Metrics
### Loss
- Regression: mean_square_error
- Binary classification: binary_crossentropy
- Multiclass classification: categorical_crossentropy
### Regression
- Mean Absolute Error(MAE)
  - outlier에 robust함
  - 절댓값을 취하기 때문에 차이를 직관적으로 느낄 수 있다
  - `MAE = sigma(|y-y^|) / n`
  - `tf.keras.metrocs.MeanAbsoluteError`
- Root Mean Square Error(RMSE)
  - 특이값에 더 가중치를 둠
  - MAE보다 더 보편적으로 사용
  - `RMSE = sqrt(sigma((y-y^)^2) / n)`
  - `tf.keras.metrics.RootMeanSqureError`
### Classification
|전체: 1000|암환자|정상환자|
|---|---|---|
|암판정|2|3|
|정상판정|7|988|
- accuracy = `(2 + 988) / 1000 = 99%`
- 암 환자, 정상 환자의 암 판정, 정상 판정하는 경우 data가 imbalance해서 accuracy로 정확한 performance 측정이 어려움(accuracy만으로는 해당 모델의 문제점을 잡아내기 어려움) → 의료이므로 자칫하면 소송으로 이어질 수도 있음
- 따라서 이용하는 것이 precision, recall
  - precision:` 2 / (2 + 3) = 40%`
  - recall: `2 / (2 + 7) = 22%`

|전체: 1000|암환자(= Positive)|정상환자(= Negative)|
|----|----|----|
|암판정|2(= True Positive, TP)|3(= False Negative, FN)|
|정상판정|7(= False Positive, FP)|988(= True Negative, TN)|
#### Precision
-  positive(= 검출하려는 대상) 판정이 얼마나 정밀했는지 보여줌 → positive 판정이 맞을 확률(= 정밀도, 양성 항목 정답률)
  - e.g. 암 판정 중 실제 암일 확률, 고양이 판정 중 실제 고양이일 확률 등
- `Precision = TP / (TP + FP)`
#### Recall
- recall: positive 사건이 잘 맞았는지 보여줌(= 재현율, 양성 항목 검출률) → 의료 쪽에서는 recall을 더 보편적으로 사용
  - e.g. 암 환자 중 암을 진단받을 확률
  - 고양이 중 실제 고양이로 인식받을 확률
  - `Recall = TP / (TP + FN)`
#### Data Imbalance
- data가 imbalance한 상황에서 잘못된 metric을 사용할 경우 → 오류를 파악하지 못하게 됨
- 따라서 case에 맞는 metric을 설정해야 함
#### Metric 결정
- F1 score: recall과 precision의 중앙값
- 결정 방법: Data balance check(→ class 별로 데이터 수가 고르게 있는지)
  - yes: accuracy
  - no: f1 score

## Pandas
- table data(pandas ~= numpy)
- numpy보다 pandas가 더 다양한 기능 제공
- 주로 다뤄지는 자료구조
  - Series(~= numpy의 1d array)
  - DataFrame(~= numpy의 2d array)
### Series
- data를 1열로 나열한 것
- index, value로 이루어짐(name도 존재)
- series를 가로로 이어 붙이면 dataframe이 됨
- list, dict로 만들 수 있음
### DataFrame
- data를 2d array 형식으로 표현한 것
- 마찬가지로 index, value로 이루어짐(name 대신 column 명이 존재)
- list, dict, series로 만들 수 있음

## Recurrent Neural Network
![RNN_Cell](https://user-images.githubusercontent.com/53527600/159104499-e58eaf94-30b8-4cb5-ab0d-c21a779a715f.png)
- RNN은 여러개의 cell로 구성
  - 기본 단위: cell(~= fully connected layer에서의 layer 1개와 유사)
  - cell의 input 
    - x_t: 해당 시점의 input feature
    - h_t-1: 이전 cell의 state 값
  - cell의 output
    - h_t: cell에서의 연산 결과
### RNN의 종류
![RNN_종류](https://user-images.githubusercontent.com/53527600/159104702-d047df26-a058-4e91-9147-92e0dc6c76b6.png)
- one to one: fully connected layer(각 cell 하나가 2d array를 나타냄)
- one to many: image captioning → sequential하지 않은 data(image)를 input으로 받고 sequential한 output(text) 출력
- many to one: sentiment classification → text를 받아서 text에 대한 감정을 출력
- many to many(1): machine translation → 문장을 끝까지 읽은 시점 부터 번역된 문장을 출력
- many to many(2): video classification → 영상을 다 보지 않고도 실시간으로 output 출력
### 용어 정리
- sample: sample 개수(→ 1회 train 기준에서는 batch_size)
- time_step(= input_length): 어느 정도의 시간을 고려할 것인가
- input_dim: input data의 feature 수
- shape = (sample, time_step, input_dim)
- unit: cell 내부의 hidden unit 개수
- hidden_state: hidden unit에서 연산한 결과
### RNN 구조
![RNN_구조](https://user-images.githubusercontent.com/53527600/159104790-0a469c4d-f11f-4a27-8034-77b81d6658aa.png)
### RNN Computation
#### Cell 연산
![cell_연산](https://user-images.githubusercontent.com/53527600/159104924-58534ad3-3c6b-4392-b40e-5d093d30a51a.png)
- `h_t = tanh(W_hh * h_(t-1) + W_xh * x_t)`
- `W_xh * x_t`: input 연산
- `W_hh * h_(t-1) + W_xh * x_t`: hidden_state 연산(→ 이전 unit의 연산 결과를 받아서 고려)
- `tanh(W_hh * h_(t-1) + W_xh * x_t)`: activation function
#### Output 연산
- `h_t = tanh(W_hh * h_(t-1) + W_xh * x_t)`
- `y_t = W_h * h_t`
- return_sequences = False
  - ![output_연산_1](https://user-images.githubusercontent.com/53527600/159104942-3b8a2d64-f163-44d5-ac43-aed0dfd00870.png)
- return_sequences = True
  - ![output_연산_2](https://user-images.githubusercontent.com/53527600/159104954-ef334a79-f70f-4c84-9b1b-ccd0bb2ae019.png)
- w_xh, w_hh, w_hy 전부 동일 layer에서는 그 값이 동일
- return_sequence를 true로 설정함을 통해 output의 dimension을 input과 같게할 수 있고 이를 통해 recurrent layer를 더 붙일 수 있음
