def get_historical_lending(df_loans):
    return df_loans.set_index('timeStamp')['wanted_wei'].sort_index().cumsum()
