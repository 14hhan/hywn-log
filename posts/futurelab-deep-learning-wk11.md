---
title: 미래연구소 딥러닝 입문 스터디 11주차
date: 2022-04-02
preview: "WK11: Saving Models and Skills for Training"
---

**미래연구소: https://futurelab.creatorlink.net/**

## The Method for Saving Model
- 단순히 한 가지 언어, 한 가지 환경이 아닌 다양한 언어로 모델을 읽을 수 있도록 저장할 수 있음
- HDF5
  - Hierarchical Data Format의 약자
  - data를 구조적으로 관리해 과학자들이 주로 사용했음
  - 어느 언어로든 읽을 수 있음
- train은 많은 연산을 필요로 하지만 predict는 train만큼 많은 연산을 요구하지는 않음
- HDF5등의 공용 파일로 저장된 trained model을 이용해 모바일 기기 등에서 predict 진행
- 모델을 저장함의 의미
  - 모델의 구조
  - 학습에 쓰인 모델의 weight 값들

## Callback
- callback: 결과에 따라 호출되는 함수
- epoch이 끝날 때 마다 실행하도록 하기 등을 할 수 있음
### ModelCheckPoint
- checkpoint: jupyter notebook에서 checkpoint를 저장하면 나중에 돌아갈 수 있음
- keras는 각 epoch마다 checkpoint
- filepath, monitor(어떤 값을 기준으로 저장할지), period, save_weight_only 등을 설정할 수 있음
- 덮어쓰기가 기본이므로 epoch 마다 이름을 바꿔주는 것을 권장
### EarlyStopping
- 학습을 진행하다가 조기 종료
- 설정 값
  - monitor: early stopping을 결정하는 기준(보통 validation loss)
  - min_delta: 지정한 값보다 작으면 멈춤
  - patience: 지정한 값의 epoch만큼 개선(감소)되지 않으면 멈춤
- 어떤 epoch가 좋을지 모를 때 컴퓨팅 자원을 아껴서 정할 수 있는 데에 의미가 있음 
### LearningRateScheduler
- seed를 고정하면 seed 값에 의존하지 않은 learning_rate에 따른 성능 변화를 알 수 있음
- schedule 함수 직접 구현: epoch의 값에 따라 learning_rate가 변하는 함수를 만들어 사용하면 됨
- tensorflow의 scheduler
  - CosineDecay(가장 자주 쓰임), ExponentialDecay, InverseTimeDecay 등
- ReduceLRonPlateau
  - learning rate의 감소 폭을 확인하면서 줄일 수 있음

## Hyperparameter Tuning
### Model
- number of layers
- number of units
- 대부분 pre-trained 모델을 사용하기도 하는 추세이므로 model쪽의 hyperparameter를 직접 변경하는 것은 권장하지 않음
### Optimization
tuning 권장의 경우 굵은 글씨체로 표기
- optimizer
- **learning rate**
  - log scale tuning (1e-5~1e-1, 보통 1e-2부터 시작)
- L2 coefficients
- dropout rate
- **batch size**
  - 2의 거듭제곱
  - 클 수록 train 속도 빠름
- **epoch**
  - early stopping
