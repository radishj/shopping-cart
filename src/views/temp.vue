    methods:{
        ...mapMutations(['setPage', 'getProductTypeData', 'getProductData', 'getProductsInCat', 'ScbNoAddOne','addSelectedP']),
        ...mapActions(['getProductData','getProductsInCat']),
        async order()
        {
            var newOrderID = -1;
            var newOrder = {
                phone : this.customer.Phone,
                saleID : this.saleID,
                info : this.info,
                isDelivery : this.$store.state.isDelivery,
                discount : this.$store.state.isDelivery
            };
            await axios.post('http://localhost:3000/order/new',newOrder).then(
                result => {
                    this.$store.state.newOrderID = result.data.ID;
                    this.selectedProducts.forEach( p => {
                        var newItem = {
                            orderNo : result.data.ID,
                            productID : p.PID,
                            unitPrice : p.UnitPrice,
                            UnitWeight : p.Unit,
                            orderedQty : p.qty,
                            unit : p.Unit,
                            qty : p.qty,
                            info : p.Info,
                            wUnitType : p.WUnitType
                        };
                        axios.post('http://localhost:3000/orderitem/new',newItem).then(
                            result => {
                                if(result.productID == p.PID)
                                {
                                    var pStock = {
                                        PID : p.PID,
                                        consumedQty : p.Unit * p.qty
                                    }
                                    await axios.post('http://localhost:3000/product/stockqty',pStock);
                                }
                            }
                        );
                    })
                }
            );
            if(this.$store.state.newOrderID >= 0)
            {
                router.push('Finish') ;
            }
        },