def get_historical_lending(df_loans):
    return df_loans.set_index('timeStamp')['wanted_wei'].sort_index().cumsum()


def get_collateral_count(df_loans):
    mask = (df_loans['TokenName'] != '')
    collateral_count = df_loans['TokenName'][mask].value_counts().reset_index()
    collateral_count = collateral_count.rename(
        columns={'index': 'label', 'TokenName': 'value'})
    return collateral_count
