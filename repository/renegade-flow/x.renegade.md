
#### (Patient) Book (initial) MC Meeting

#### (Patient) Visit MC Meeting

#### (MC Provider) Meeting ends

  [-] > is order/kit required => NO => END
  [-] > is order/kit required => YES => Created Order

#### (Patient) Register KIT-ID

#### (Renegade) (Order) => KIT-ID => Create (Orchard) Order

#### (Orchard) Release lab-results (Order) => 

  [-] > (Renegade) (sync-service) process lab-results (Order) => 
    [-] > is POSITIVE results => NO => END => auto-release lab-results to patient
    [-] > is POSITIVE results => YES => 
      [-] > Create Mecase Async-Task
      [-] > NOTIFY: (Provider + Patient)


#### (Renegede) => (Medcase) Book follow-up appointment

  [-] > Patient (Book follow-up appointment)
  [-] > Navigator (Book follow-up appointment)

#### (Patient) Visit MC Meeting (follow-up appointment)

#### (Renegade) (Provider) => Release Lab-Results to Patient



