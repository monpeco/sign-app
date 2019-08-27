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

export const searchHOR = ({ SEARCH }) => ({
  [SEARCH]: state => ({
    ...state,
    fetching: false,
    fetched: true,
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
      fetched: true,
      fetching: false,
    }),
})
  
export const editHOR = ({ EDIT }) => ({
  [EDIT]: (state, { payload }) => ({
    ...state,
    fetched: true,
    fetching: false,
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
    fetched: false,
    fetching: false,
    data: state.data.filter(x => x.id !== payload)
  }),
})
