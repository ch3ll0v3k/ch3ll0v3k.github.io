#### CV


```mermaid
flowchart TD;
  start{Does it work?} -- Yes? --> jobDone{Done};
  start{Does it work?} -- No? --> no_1{Use hammer};
  no_1{Use hammer} -- And now? --> yes_1{Yes};
  no_1{Use hammer} -- And now? --> no_2{No};
```

```
flowchart TD;
  A{test-a} -- Yes? --> Y{test-y};
  A{test-a} -- No? --> N{test-n};
  A{test-a} -- Maybe? --> M{test-m};
  A{test-a} -- Other? --> O{test-o};
  Y -- yyy --> End;
  N -- nnn --> End;
  M -- mmm --> End;
  O -- ooo --> End;
```
