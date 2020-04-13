package com.kursatcoskun.issuemanagement.util;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilResponse<T> {

    private T data;
    private ProcessResult processResult;


}
