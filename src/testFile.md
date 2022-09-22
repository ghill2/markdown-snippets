## Make a parameter range

Description of make a parameter range snippet.

```python
import itertools
PARAM_SET = list(
    {"fast_ema_period": x, "slow_ema_period": y}
    for x, y in itertools.product(
        list(range(10, 16 + 1, 2)),
        list(range(talib20, 26 + 1, 2))
))
[print(d) for d in PARAM_SET]
exit()
```

## Create parameter range with comprehension
Description of make a parameter range snippet with comprehension.

```python pre="tes"
PARAM_SET = [
        {"fast_ema_period": x, "slow_ema_period": y}
        for x, y in zip(
            list(range(10, 16)),
            list(range(20, 26))
        )
    ]
```