package com.kursatcoskun.issuemanagement.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProcessResult {
    private String status;
    private ResponseMessage message;
}
