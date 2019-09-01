export const createFetch = ({ START, SUCCESS, ERROR }) => ({
    [START]: state => ({ ...state, fetching: true }),
    [SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload,
      fetched: true,
      fetching: false,
    }),
    [ERROR]: (state, { error }) => ({
      ...state,
      error,
      fetching: false,
    }),
})

export const resetFetch = ({ START, SUCCESS, ERROR }) => ({
  [START]: state => ({ ...state, fetching: true }),
  [SUCCESS]: (state) => ({
    ...state,
    data: {},
    fetched: true,
    fetching: false,
  }),
  [ERROR]: (state, { error }) => ({
    ...state,
    error,
    fetching: false,
  }),
})

export const assignHOR = ({ ASSIGN }) => ({
  [ASSIGN]: (state, { payload }) => ({
    ...state,
    data: payload
    }),
})

export const selectHOR = ({ SELECT }) => ({
  [SELECT]: (state, { payload }) => ({
      ...state,
      data: state.data.map(x => ({
      ...x,
      selected: x.id === payload,
      }))
  }),
})

export const addHOR = ({ ADD }) => ({
    [ADD]: (state, { payload }) => ({
      ...state,
      data: state.data.concat([payload]),
    }),
})
  
export const editHOR = ({ EDIT }) => ({
  [EDIT]: (state, { payload }) => ({
    ...state,
    data: state.data.map(x => {
      if(x.id === payload.id)
        return payload 
      else
        return x
    })
  })
})

export const toggleHOR = ({ TOGGLE }) => ({
  [TOGGLE]: (state, { payload }) => ({
    ...state,
    data: !state.data
  }),
})

export const delHOR = ({ DEL }) => ({
  [DEL]: (state, { payload }) => ({
    ...state,
    data: state.data.filter(x => x.id !== payload)
  }),
})
